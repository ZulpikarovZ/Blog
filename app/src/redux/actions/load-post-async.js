import { setPostData } from './set-post-data';

export const loadPostAsync = (serverRequest, postId) => (dispatch) => {
	serverRequest('fetchPost', postId).then((postData) => {
		dispatch(setPostData(postData.res));
	});
};
