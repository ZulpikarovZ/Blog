import { transformPost } from '../transformers';

export const updatePost = (newPostData) =>
	fetch(`http://localhost:3004/posts/${newPostData.id}`, {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: newPostData.imageUrl,
			title: newPostData.title,
			content: newPostData.content,
		}),
	})
		.then((updatedPost) => updatedPost.json())
		.then((updatedPost) => updatedPost && transformPost(updatedPost));
