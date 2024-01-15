import { setPostData } from './set-post-data';

export const loadPostAsync = (serverRequest, postId) => (dispatch) =>
	serverRequest('fetchPost', postId).then((postData) => {
		if (postData.res) {
			dispatch(setPostData(postData.res));
		}

		return postData;
	});
