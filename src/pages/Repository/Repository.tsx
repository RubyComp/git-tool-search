import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { RepositoryDetails } from '@/entities/repository/ui/RepositoryDetails';
import { useStore } from '@/shared/store/store';

export const RepositoryPage: React.FC = () => {
	const { id } = useParams<Record<string, string | undefined>>();
	const { clearRepositoryDetails } = useStore();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		clearRepositoryDetails();
	}, [id, clearRepositoryDetails]);

	if (!id) {
		return <div>Repository ID is missing</div>;
	}

	const handleBackClick = () => {
		navigate({
			pathname: '/',
			search: location.search,
		});
	};

	return (
		<div>
			<button onClick={handleBackClick}>{'<–'} back to main page</button>
			<h1>Repository Details</h1>
			<RepositoryDetails id={id} />
		</div>
	);
};
