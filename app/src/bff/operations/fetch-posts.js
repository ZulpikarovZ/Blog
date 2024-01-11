import { getAllComments, getPosts } from '../api';

export const fetchPosts = async () => {
	// const posts = await getPosts();
	// const comments = await getAllComments();
	const [posts, comments] = await Promise.all([getPosts(), getAllComments()]);

	const getCommentsCount = posts.map((post) => {
		const postComments = comments.filter((comment) => comment.postId === post.id);

		return {
			...post,
			commentsCount: postComments.length,
		};
	});

	return {
		error: null,
		res: getCommentsCount,
	};
};
