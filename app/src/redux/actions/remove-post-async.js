export const removePostAsync = (serverRequest, postId) => () =>
	serverRequest('removePost', postId);
