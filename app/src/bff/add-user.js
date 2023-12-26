import { getRandomDate } from './get-random-date';

export const addUser = (login, password) =>
	fetch('http://localhost:3004/users', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login: login,
			password: password,
			role_id: 2,
			registered_at: getRandomDate(),
		}),
	}).then((createdUser) => createdUser.json());
