import { RESET_POST_DATA, SET_POST_DATA } from '../action-types/action-types';

const postInitialState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export const postReducer = (state = postInitialState, action) => {
	switch (action.type) {
		case SET_POST_DATA:
			return { ...state, ...action.payload };

		case RESET_POST_DATA:
			return postInitialState;

		default:
			return state;
	}
};
