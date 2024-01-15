import { ROLE } from '../../constants/role';
import { getPostCommentsWithAuthor } from '../../utils';
import { deleteComment, getPost } from '../api';
import { sessions } from '../sessions';

export const removePostComment = async (hash, commentId, postId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteComment(commentId);

	const post = await getPost(postId);

	const commentWithAuthors = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentWithAuthors,
		},
	};
};
