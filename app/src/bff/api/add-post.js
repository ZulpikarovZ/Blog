import { getRandomDate } from '../../utils';

export const addPost = (newPostData) =>
	fetch('http://localhost:3004/posts', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: newPostData.imageUrl,
			title: newPostData.title,
			content: newPostData.content,
			published_at: getRandomDate(),
		}),
	}).then((createdPost) => createdPost.json());
