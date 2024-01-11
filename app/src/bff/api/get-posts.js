import { transformPost } from '../transformers';

export const getPosts = async () =>
	fetch('http://localhost:3004/posts')
		.then((loadedPosts) => loadedPosts.json())
		.then((posts) => posts && posts.map(transformPost));
