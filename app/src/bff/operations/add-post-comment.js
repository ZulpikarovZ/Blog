import { ROLE } from '../../constants/role';
import { getPostCommentsWithAuthor } from '../../utils';
import { addComment, getPost } from '../api';
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

	const commentWithAuthors = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentWithAuthors,
		},
	};
};
