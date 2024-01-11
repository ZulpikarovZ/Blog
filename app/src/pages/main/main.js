import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PostCard } from '../../components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const serverRequest = useServerRequest();

	useEffect(() => {
		serverRequest('fetchPosts').then((posts) => {
			if (posts.error) {
				return;
			}

			setPosts(posts.res);
		});
		// eslint-disable-next-line
	}, []);

	return (
		<div className={className}>
			<div className="post-list">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 20px;
	}
`;
