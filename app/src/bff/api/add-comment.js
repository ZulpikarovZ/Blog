import { getRandomDate } from '../utils';

export const addComment = (postId, userId, content) =>
	fetch('http://localhost:3004/comments', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			content: content,
			published_at: getRandomDate(),
		}),
	});
