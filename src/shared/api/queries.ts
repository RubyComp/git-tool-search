import { gql } from '@apollo/client';
import client from '@/shared/api/client';
import { Repository } from '@/shared/store/types';

const GET_REPOSITORIES = gql`
	query($query: String!, $after: String) {
		search(query: $query, type: REPOSITORY, first: 10, after: $after) {
			pageInfo {
				endCursor
				hasNextPage
			}
			repositoryCount
			nodes {
				... on Repository {
					id
					name
					description
					stargazerCount
					updatedAt
					owner {
						login
						url
						avatarUrl
					}
					languages(first: 5) {
						nodes {
							name
						}
					}
				}
			}
		}
	}
`;

const GET_REPOSITORY_DETAILS = gql`
	query($id: ID!) {
		node(id: $id) {
			... on Repository {
				id
				name
				description
				stargazerCount
				updatedAt
				owner {
					login
					url
					avatarUrl
				}
				languages(first: 5) {
					nodes {
						name
					}
				}
			}
		}
	}
`;

export const fetchGitHubRepositories = async (query: string, after: string | null) => {
	const response = await client.query({
		query: GET_REPOSITORIES,
		variables: { query, after },
	});

	const totalPages = Math.ceil(response.data.search.repositoryCount / 10);

	return {
		repositories: response.data.search.nodes.map((repo: any) => ({
			id: repo.id,
			name: repo.name,
			description: repo.description,
			stars: repo.stargazerCount,
			lastCommitDate: repo.updatedAt,
			ownerName: repo.owner.login,
			ownerUrl: repo.owner.url,
			ownerAvatar: repo.owner.avatarUrl,
			languages: repo.languages.nodes.map((lang: any) => lang.name),
		})),
		totalPages,
		endCursor: response.data.search.pageInfo.endCursor,
	};
};

export const fetchGitHubRepositoryDetails = async (id: string): Promise<Repository> => {
	const response = await client.query({
		query: GET_REPOSITORY_DETAILS,
		variables: { id },
	});

	const repo = response.data.node;

	return {
		id: repo.id,
		name: repo.name,
		description: repo.description,
		stars: repo.stargazerCount,
		lastCommitDate: repo.updatedAt,
		ownerName: repo.owner.login,
		ownerUrl: repo.owner.url,
		ownerAvatar: repo.owner.avatarUrl,
		languages: repo.languages.nodes.map((lang: any) => lang.name),
	};
};

export const getCursorForPage = async (query: string, page: number): Promise<string | null> => {
	if (page <= 1) return null;

	let cursor = null;
	for (let i = 1; i < page; i++) {
		const response: any = await client.query({
			query: GET_REPOSITORIES,
			variables: { query, first: 10, after: cursor },
		});
		cursor = response.data.search.pageInfo.endCursor;
	}

	return cursor;
};
