import { transformUser } from '../transformers/transform-user';

export const getUsers = () =>
	fetch('http://localhost:3004/users')
		.then((loadedUsers) => loadedUsers.json())
		.then((users) => users && users.map(transformUser));
