import { ROLE } from '../../constants/role';
import { getRandomDate } from '../../utils';

export const addUser = (login, password) =>
	fetch('http://localhost:3004/users', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login: login,
			password: password,
			role_id: ROLE.READER,
			registered_at: getRandomDate(),
		}),
	}).then((createdUser) => createdUser.json());
