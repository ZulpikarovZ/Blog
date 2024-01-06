import { ROLE } from '../../constants/role';
import { deleteComment, getComments, getPost, getUsers } from '../api';
import { sessions } from '../sessions';

export const removePostComment = async (hash, commentId, postId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODER];

	const access = sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteComment(commentId);

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
