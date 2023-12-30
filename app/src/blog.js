import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Authorization, Registration, Users } from './pages';
import { Footer, Header } from './components';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
	width: 1000px;
	background-color: #fff;
	margin: auto;
`;

const Content = styled.div`
	padding: 120px 0;
`;

export const Blog = () => {
	return (
		<AppContainer>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>Статья</div>} />
					<Route path="/post/post:id" element={<div>Новая статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppContainer>
	);
};
