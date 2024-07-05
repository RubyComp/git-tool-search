import { useStore } from '@/shared/store/store';
import { formatDate } from '@/shared/utility/formatDate';
import { useEffect } from 'react';

interface RepositoryDetailsProps {
	id: string;
}

export const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({ id }) => {
	const { fetchRepositoryDetails, repositoryDetails } = useStore();

	useEffect(() => {
		fetchRepositoryDetails(id);
	}, [id, fetchRepositoryDetails]);

	if (!repositoryDetails) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>{repositoryDetails.name}</h2>
			<p>{repositoryDetails.description}</p>
			<p>Stars: {repositoryDetails.stars}</p>
			<p>Last updated: {formatDate(repositoryDetails.lastCommitDate)}</p>
			<p>Owner: <a href={repositoryDetails.ownerUrl} target="_blank">{repositoryDetails.ownerName}</a></p>
			<img src={repositoryDetails.ownerAvatar} alt={repositoryDetails.ownerName} />
			<p>Languages: {repositoryDetails.languages.join(', ')}</p>
		</div>
	);
};
