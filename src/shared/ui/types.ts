export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export interface PageButtonProps {
	start: number;
	end: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	totalPages: number;
}

export interface HandlePageChangeProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export interface RenderPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}
