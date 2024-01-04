import { server } from '../../bff/server';
import { LOGOUT } from '../action-types/action-types';

export const logout = (session) => {
	server.logout(session);

	return {
		type: LOGOUT,
	};
};
