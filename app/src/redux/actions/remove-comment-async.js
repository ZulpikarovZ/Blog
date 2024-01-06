import { setPostData } from './set-post-data';

export const removeCommentAsync = (serverRequest, commentId, postId) => (dispatch) => {
	serverRequest('removePostComment', commentId, postId).then((postData) => {
		dispatch(setPostData(postData.res));
	});
};
