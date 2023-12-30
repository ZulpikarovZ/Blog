import styled from 'styled-components';
import { StyledUserRow, UserItem, H2, Content } from '../../components';
import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks/use-server-request';
import { ROLE } from '../../constants/role';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const serverRequest = useServerRequest();

	new useEffect(() => {
		setTimeout(() => {
			Promise.all([serverRequest('fetchUsers'), serverRequest('fetchRoles')]).then(
				([usersRes, rolesRes]) => {
					if (usersRes.error || rolesRes.error) {
						setErrorMessage(usersRes.error || rolesRes.error);
						return;
					}
					setUsers(usersRes.res);
					setRoles(rolesRes.res);
				},
			);
		}, 10);
	}, [shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		serverRequest('removeUser', userId).then(() =>
			setShouldUpdateUserList(!shouldUpdateUserList),
		);
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2>Пользователи</H2>
				<StyledUserRow className="user-header-row">
					<div className="table-login">Логин</div>
					<div className="table-reg-date">Дата регистрации</div>
					<div className="table-role">Роль</div>
				</StyledUserRow>
				{users.map((user) => (
					<UserItem
						key={user.id}
						user={user}
						roles={roles.filter((role) => role.id !== ROLE.GUEST)}
						onUserRemove={() => onUserRemove(user.id)}
					/>
				))}
			</Content>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& .user-header-row {
		margin: 0 0 10px -30px;
	}
`;
