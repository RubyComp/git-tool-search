import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '@/shared/store/store';
import { SearchBar } from '@/features/search/ui/SearchBar';
import { RepositoryList } from '@/entities/repository/ui/RepositoryList';
import { Pagination } from '@/shared/ui/Pagination';
import { DEFAULT_SEARCH } from '@/config';

export const HomePage: React.FC = () => {
	const { searchRepositories, setPage, currentPage, totalPages, isLoading, repositories, searchText, setSearchText } = useStore();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const query = searchParams.get('query') || DEFAULT_SEARCH;
		const page = parseInt(searchParams.get('page') || '1', 10);

		setSearchText(query);
		setPage(page);
		searchRepositories(query, page);
	}, [searchParams, searchRepositories, setPage, setSearchText]);

	const handlePageChange = (page: number) => {
		setSearchParams({ query: searchText, page: page.toString() });
	};

	const handleSearch = (query: string) => {
		setSearchParams({ query, page: '1' });
	};

	return (
		<div>
			<h1>Home Page</h1>
			<SearchBar initialSearchText={searchText} onSearch={handleSearch} />
			{isLoading ? (
				<div>Loading…</div>
			) : (
				<>
					{repositories.length === 0 ? (
						<div>No repositories found.</div>
					) : (
						<RepositoryList />
					)}
					<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
				</>
			)}
		</div>
	);
};
