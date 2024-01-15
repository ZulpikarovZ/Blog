export const deletePost = async (postId) =>
	fetch(`http://localhost:3004/posts/${postId}`, {
		method: 'DELETE',
	});
