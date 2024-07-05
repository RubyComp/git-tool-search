import { API_KEY, API_URL } from '@/config';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: API_URL,
	headers: {
		Authorization: `Bearer ${API_KEY}`,
	},
	cache: new InMemoryCache(),
});

export default client;
