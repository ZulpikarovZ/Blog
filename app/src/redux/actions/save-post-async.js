import { setPostData } from './set-post-data';

export const savePostAsync = (serverRequest, newPostData) => (dispatch) =>
	serverRequest('savePost', newPostData).then((updatedPost) => {
		dispatch(setPostData(updatedPost.res));

		return updatedPost.res;
	});
