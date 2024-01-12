import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard } from '../../components';
import { PAGINATION_LIMIT } from '../../constants/pagination-limit';
import { getLastPageFromLinks } from '../../utils';

const MainContainer = ({ className }) => {
	const serverRequest = useServerRequest();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	console.log('posts ', posts);

	useEffect(() => {
		serverRequest('fetchPosts', page, PAGINATION_LIMIT).then((posts) => {
			setPosts(posts.res.getPostsFromServer);
			setLastPage(getLastPageFromLinks(posts.res.links));
		});
		// eslint-disable-next-line
	}, [page]);

	return (
		<div className={className}>
			<div className="post-list">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
			{lastPage > 1 && (
				<Pagination
					page={page}
					setPage={setPage}
					lastPage={lastPage}
					setLastPage={setLastPage}
				/>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	// display: flex;
	// align-items: center;
	// justify-content: center;
	// width: 200px;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}
`;
