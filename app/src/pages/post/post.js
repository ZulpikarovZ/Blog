import styled from 'styled-components';
import { Comments, PostContent, PostForm } from '../../components';
import { useEffect, useLayoutEffect } from 'react';
import { loadPostAsync, resetPostData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../redux/selectors';

const PostContainer = ({ className }) => {
	const serverRequest = useServerRequest();
	const params = useParams();
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	const isEditing = useMatch('post/:id/edit');

	useLayoutEffect(() => {
		dispatch(resetPostData());
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadPostAsync(serverRequest, params.id));
		// eslint-disable-next-line
	}, []);

	return (
		<div className={className}>
			{isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 40px 80px;
	white-space: pre-line;
`;
