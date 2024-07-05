import { useState, useEffect } from 'react';

interface SearchBarProps {
	initialSearchText: string;
	onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ initialSearchText, onSearch }) => {
	const [query, setQuery] = useState(initialSearchText);

	useEffect(() => {
		setQuery(initialSearchText);
	}, [initialSearchText]);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch(query);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<form onSubmit={handleSearch}>
			<input
				type="text"
				value={query}
				onChange={handleChange}
				placeholder="Search repositories…"
			/>
			<button type="submit">Search</button>
		</form>
	);
};
