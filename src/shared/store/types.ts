export interface Repository {
	id: string;
	name: string;
	description: string;
	stars: number;
	lastCommitDate: string;
	ownerName: string;
	ownerUrl: string;
	ownerAvatar: string;
	languages: string[];
}

export interface StoreState {
	repositories: Repository[];
	repositoryDetails: Repository | null;
	currentPage: number;
	totalPages: number;
	isLoading: boolean;
	hasError: boolean;
	searchText: string;
	cursors: Record<number, string | null>;
	searchRepositories: (query: string, page: number) => void;
	fetchRepositoryDetails: (id: string) => void;
	clearRepositoryDetails: () => void;
	setPage: (page: number) => void;
	setSearchText: (text: string) => void;
}
