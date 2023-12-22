import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Link, useNavigate } from 'react-router-dom';

const RightAligned = styled.div`
	display: flex;
	justify-content: end;
`;

const Button = styled.button`
	font-size: 18px;
	width: 100px;
	height: 32px;
	cursor: pointer;
`;

const Div = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAligned>
				<Link to="/login">
					<Button>Войти</Button>
				</Link>
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
