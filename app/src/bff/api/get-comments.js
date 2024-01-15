import { transformComments } from '../transformers';

export const getComments = async (postId) =>
	fetch(`http://localhost:3004/comments?post_id=${postId}`)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments.map(transformComments));
