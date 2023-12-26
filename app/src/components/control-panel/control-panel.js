import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../constants/role';
import { logout } from '../../redux/actions/actionCreaters';
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

const Div = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	console.log('control-panel ', user);

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
						<Div onClick={() => dispatch(logout(user.session))}>
							<Icon id="fa-sign-out" margin="0 0 0 10px" />
						</Div>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Div onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 15px 0 0" />
				</Div>
				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 15px 0 0" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 0" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
