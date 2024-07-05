import { create } from 'zustand';
import { StoreState } from '@/shared/store/types';
import { DEFAULT_SEARCH } from '@/config';
import {
	fetchGitHubRepositories,
	fetchGitHubRepositoryDetails,
	getCursorForPage
} from '@/shared/api/queries';

export const useStore = create<StoreState>((set, get) => ({
	repositories: [],
	repositoryDetails: null,
	currentPage: 1,
	totalPages: 1,
	isLoading: false,
	hasError: false,
	searchText: DEFAULT_SEARCH,
	cursors: {},

	searchRepositories: async (query: string, page: number) => {
		set({ isLoading: true, hasError: false });
		try {
			let cursor = get().cursors[page - 1] || null;
			
			if (!cursor && page > 1) {
				cursor = await getCursorForPage(query, page);
				set((state) => ({ cursors: { ...state.cursors, [page - 1]: cursor } }));
			}

			const response = await fetchGitHubRepositories(query, cursor);
			set((state) => ({
				repositories: response.repositories,
				totalPages: response.totalPages,
				isLoading: false,
				searchText: query,
				currentPage: page,
				cursors: { ...state.cursors, [page]: response.endCursor },
			}));
		} catch (error) {
			set({ hasError: true, isLoading: false });
		}
	},

	fetchRepositoryDetails: async (id: string) => {
		set({ isLoading: true, hasError: false });
		try {
			const response = await fetchGitHubRepositoryDetails(id);
			set({ repositoryDetails: response, isLoading: false });
		} catch (error) {
			set({ hasError: true, isLoading: false });
		}
	},

	clearRepositoryDetails: () => set({ repositoryDetails: null }),

	setPage: (page: number) => {
		set({ currentPage: page });
	},

	setSearchText: (text: string) => set({ searchText: text }),
}));
