import { useStore } from '@/shared/store/store';
import { formatDate } from '@/shared/utility/formatDate';
import { Link, useLocation } from 'react-router-dom';

export const RepositoryList = () => {
	const { repositories } = useStore();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	return (
		<table className="list-table" cellPadding={6}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Stars</th>
					<th>Last Update</th>
				</tr>
			</thead>
			<tbody>
				{repositories.map(repo => (
					<tr key={repo.id}>
						<td>
							<Link to={`/repository/${repo.id}?${searchParams.toString()}`}>
								{repo.name}
							</Link>
						</td>
						<td align="center">{repo.stars}</td>
						<td align="center">{formatDate(repo.lastCommitDate)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
