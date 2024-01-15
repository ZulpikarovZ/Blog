import { transformPost } from '../transformers';

export const getPosts = async (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3004/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]),
		)
		.then(([posts, links]) => ({
			posts: posts && posts.map(transformPost),
			links: links,
		}));
