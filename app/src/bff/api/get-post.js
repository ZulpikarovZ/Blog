import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3004/posts/${postId}`)
		.then((loadedPost) => loadedPost.json())
		.then((post) => post && transformPost(post));
