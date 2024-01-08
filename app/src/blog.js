import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Authorization, Registration, Users, Post } from './pages';
import { Footer, Header, Modal } from './components';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
	width: 1000px;
	background-color: #fff;
	margin: auto;
`;

const Page = styled.div`
	padding: 120px 0 0 0;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserData = JSON.parse(sessionStorage.getItem('userData'));
		console.log('currentUserData', currentUserData);

		if (!currentUserData) {
			return;
		}

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.id) }));
	}, [dispatch]);

	return (
		<AppContainer>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppContainer>
	);
};
