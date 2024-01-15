import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff/server';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';
import { selectUser } from '../../redux/selectors';
import { ROLE } from '../../constants/role';
import { AuthFormError, AuthButton, Input, H2 } from '../../components';
import { useResetForm } from '../../hooks';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин. Допускаются только буквы и цифры')
		.matches(/^\w+$/, 'Неверный логин')
		.min(3, 'Некорректный логин. Минимум 3 символа')
		.max(15, 'Некорректный логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните логин. Допускаются буквы, цифры и знаки # %')
		.matches(/^[\w#%]+$/, 'Неверный логин')
		.min(6, 'Некорректный пароль. Минимум 6 символов')
		.max(30, 'Некорректный пароль. Максимум 30 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	fonst-size: 18px;
	color: blue;
`;

const AuthorizationContainer = ({ className }) => {
	const [serverError, setServerError] = useState('');
	const dispatch = useDispatch();
	const { roleId } = useSelector(selectUser);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
					autoComplete="on"
				/>
				<AuthButton type="submit" disabled={!!formError}>
					Авторизоваться
				</AuthButton>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
