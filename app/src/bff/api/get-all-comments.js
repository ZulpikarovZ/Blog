import { transformComments } from '../transformers';

export const getAllComments = async () =>
	fetch('http://localhost:3004/comments')
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments.map(transformComments));
