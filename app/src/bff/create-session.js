import { ROLE } from '../constants/role';
import { removeComment } from './session/remove-comment';

export const createSession = (roleId) => {
	const session = {
		logout() {
			Object.keys(session).forEach((key) => delete session[key]);
		},
	};

	switch (roleId) {
		case ROLE.ADMIN: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.MODER: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.READER: {
			break;
		}

		default:
		//ничего не делаем
	}

	return session;
};
