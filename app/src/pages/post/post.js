import styled from 'styled-components';
import { Comments, PostContent } from '../../components';
import { useEffect } from 'react';
import { loadPostAsync } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../redux/selectors';

const PostContainer = ({ className }) => {
	const serverRequest = useServerRequest();
	const params = useParams();
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	console.log('post =-> ', post);

	useEffect(() => {
		dispatch(loadPostAsync(serverRequest, params.id));
		// eslint-disable-next-line
	}, []);

	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 40px 80px;
`;
