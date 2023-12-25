import { LOGOUT } from '../action-types/action-types';

const userInitialState = {
	wasLogout: false,
};

export const appReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};

		default:
			return state;
	}
};
