import { getComments, getPost, getUsers } from '../api';

export const fetchPost = async (postId) => {
	let post;
	let error;

	try {
		post = await getPost(postId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return {
			error: error,
			res: null,
		};
	}

	const comments = await getComments(postId);
	const users = await getUsers();

	const commentWithAuthors = comments.map((comment) => {
		const user = users.find((user) => user.id === comment.authorId);

		return {
			...comment,
			author: user.login,
		};
	});

	return {
		error: null,
		res: {
			...post,
			comments: commentWithAuthors,
		},
	};
};
