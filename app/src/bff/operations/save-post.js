import { ROLE } from '../../constants/role';
import { updatePost } from '../api';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const updatedPost = await updatePost(newPostData);

	return {
		error: null,
		res: updatedPost,
	};
};
