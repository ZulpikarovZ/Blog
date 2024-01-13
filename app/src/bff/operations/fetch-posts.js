import { getAllComments, getPosts } from '../api';

export const fetchPosts = async (searchPhrase, page, limit) => {
	const [{ posts, links }, comments] = await Promise.all([
		getPosts(searchPhrase, page, limit),
		getAllComments(),
	]);

	const getPostsFromServer = posts.map((post) => {
		const postComments = comments.filter((comment) => comment.postId === post.id);

		return {
			...post,
			commentsCount: postComments.length,
		};
	});

	return {
		error: null,
		res: { getPostsFromServer, links: links },
	};
};
