import { ROLE } from '../../constants/role';
import { addComment, getComments, getPost, getUsers } from '../api';
import { sessions } from '../sessions';

export const addPostComment = async (hash, postId, userId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODER, ROLE.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await addComment(postId, userId, content);

	const post = await getPost(postId);
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
