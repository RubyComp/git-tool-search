import {
	PaginationProps,
	PageButtonProps,
	HandlePageChangeProps,
	RenderPaginationProps
} from './types';

const MAX_BUTTONS = 10;

const handlePageChange = ({
	page,
	totalPages,
	onPageChange
}: HandlePageChangeProps) => {
	if (page >= 1 && page <= totalPages) {
		onPageChange(page);
	}
};

const generatePageButtons = ({
	start,
	end,
	currentPage,
	onPageChange,
	totalPages
}: PageButtonProps) => {
	const buttons = [];
	for (let i = start; i <= end; i++) {
		buttons.push(
			<button
				key={i}
				onClick={() => handlePageChange({ page: i, totalPages, onPageChange })}
				className={i === currentPage ? 'current' : ''}
			>
				{i}
			</button>
		);
	}
	return buttons;
};

const renderPagination = ({ currentPage, totalPages, onPageChange }: RenderPaginationProps) => {
	const pages = [];

	if (totalPages <= MAX_BUTTONS) {
		pages.push(...generatePageButtons({
			start: 1,
			end: totalPages,
			currentPage,
			onPageChange,
			totalPages
		}));

	} else {
		const startPages = generatePageButtons({
			start: 1,
			end: 5,
			currentPage,
			onPageChange,
			totalPages
		});

		pages.push(...startPages);

	}

	return pages;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	return (
		<div className="buttons-set">
			{renderPagination({ currentPage, totalPages, onPageChange })}
		</div>
	)
};
