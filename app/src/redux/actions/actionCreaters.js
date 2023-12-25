import { LOGOUT, SET_USER } from '../action-types/action-types';
import { server } from '../../bff/server';

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const logout = (session) => {
	server.logout(session);

	return {
		type: LOGOUT,
	};
};
