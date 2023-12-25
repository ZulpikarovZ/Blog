import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Authorization } from './pages/authorization/authorization';

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
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Статья</div>} />
					<Route path="/post/post:id" element={<div>Новая статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppContainer>
	);
};
