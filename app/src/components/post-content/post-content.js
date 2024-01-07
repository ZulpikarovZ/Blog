import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { useNavigate } from 'react-router-dom';

const PostContentCotainer = ({ className, post }) => {
	const navigate = useNavigate();
	const onEdit = () => {
		navigate(`/post/${post.id}/edit`);
	};

	return (
		<div className={className}>
			<img src={post.imageUrl || post.image_url} alt={post.title}></img>
			<h2>{post.title}</h2>
			<div className="special-panel">
				<div className="panel-item">
					<Icon id="fa-calendar-o" size="20px" margin="0 10px 0 0" />
					<div className="published">{post.publishedAt}</div>
				</div>
				<div className="panel-item">
					<Icon
						id="fa-pencil-square-o"
						size="20px"
						margin="0 10px 0 0"
						onClick={onEdit}
					/>
					<Icon id="fa-trash-o" size="20px" />
				</div>
			</div>
			<div>{post.content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentCotainer)`
	& img {
		float: left;
		margin: 0px 20px 14px 0;
	}

	& .special-panel {
		margin: 20px 0;
		font-size: 18px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .panel-item {
		display: flex;
		align-items: center;
	}

	& .panel-item:nth-child(2) div:nth-child(1) {
		display: flex;
		align-items: center;
		margin-top: 3px;
	}

	& .published {
		margin-top: 2px;
	}
`;
