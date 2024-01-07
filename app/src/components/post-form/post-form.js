import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Input } from '../input/input';
import { useRef } from 'react';
import { sanitizeContent } from '../../utils';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { savePostAsync } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const PostFormCotainer = ({ className, post }) => {
	const imageUrlRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const serverRequest = useServerRequest();
	const navigate = useNavigate();

	const onPostSave = () => {
		const newImageUrlRef = imageUrlRef.current.value;
		const newtitleRef = titleRef.current.value;
		const newcontentRef = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(serverRequest, {
				id: post.id,
				imageUrl: newImageUrlRef,
				title: newtitleRef,
				content: newcontentRef,
			}),
		).then(() => navigate(`/post/${post.id}`));
	};

	return (
		<div className={className}>
			<Input
				ref={imageUrlRef}
				defaultValue={post.imageUrl}
				placeholder="Изображение..."
			/>
			<Input ref={titleRef} defaultValue={post.title} placeholder="Заголовок..." />
			<div className="special-panel">
				<div className="panel-item">
					<Icon id="fa-calendar-o" size="20px" margin="0 10px 0 0" />
					<div className="published">{post.publishedAt}</div>
				</div>
				<div className="panel-item">
					<Icon
						id="fa-floppy-o"
						size="20px"
						margin="0 10px 0 0"
						onClick={onPostSave}
					/>
					<Icon id="fa-trash-o" size="20px" />
				</div>
			</div>
			<div
				ref={contentRef}
				contentEditable="true"
				suppressContentEditableWarning="true"
			>
				{post.content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormCotainer)`
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
	}

	& .published {
		margin-top: 2px;
	}
`;
