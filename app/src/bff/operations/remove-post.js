import { ROLE } from '../../constants/role';
import { deleteComment, deletePost, getComments } from '../api';
import { sessions } from '../sessions';

export const removePost = async (hash, postId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deletePost(postId);

	const comments = await getComments(postId);

	await Promise.all(comments.map((comment) => deleteComment(comment.id)));

	return {
		error: null,
		res: true,
	};
};
