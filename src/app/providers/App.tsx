import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/Home/Home';
import { RepositoryPage } from '@/pages/Repository/Repository';

export const App = () => (
<Routes>
	<Route path="/" element={<HomePage />} />
	<Route path="/repository/:id" element={<RepositoryPage />} />
</Routes>
);
