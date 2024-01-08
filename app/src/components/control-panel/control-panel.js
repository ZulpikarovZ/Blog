import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '../';
import { ROLE } from '../../constants/role';
import { logout } from '../../redux/actions';
import { selectUser } from '../../redux/selectors';

const RightAligned = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;

	& span {
		font-weight: bold;
	}

	& span + div {
		display: flex;
		align-items: center;
		height: 32px;
	}
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const onLogout = () => {
		dispatch(logout(user.session));
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<RightAligned>
				{user.roleId === ROLE.GUEST ? (
					<Link to="/login">
						<Button width="100px">Войти</Button>
					</Link>
				) : (
					<>
						<span>{user.login}</span>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id="fa-backward"
					margin="10px 15px 0 0"
					onClick={() => navigate(-1)}
				/>
				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 15px 0 0" onClick={() => {}} />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 0" onClick={() => {}} />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
