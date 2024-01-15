import { setPostData } from './set-post-data';

export const addCommentAsync = (serverRequest, postId, userId, content) => (dispatch) => {
	serverRequest('addPostComment', postId, userId, content).then((postData) => {
		dispatch(setPostData(postData.res));
	});
};
