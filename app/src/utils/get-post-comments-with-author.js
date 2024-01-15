import { getComments, getUsers } from '../bff/api';

export const getPostCommentsWithAuthor = async (postId) => {
	const comments = await getComments(postId);
	const users = await getUsers();

	return comments.map((comment) => {
		const user = users.find((user) => user.id === comment.authorId);

		return {
			...comment,
			author: user.login,
		};
	});
};
