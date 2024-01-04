export const transformComments = (dbComments) => ({
	id: dbComments.id,
	authorId: dbComments.author_id,
	postId: dbComments.post_id,
	content: dbComments.content,
	publishedAt: dbComments.published_at,
});
