import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Comment } from '../';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserRoleId } from '../../redux/selectors';
import { useServerRequest } from '../../hooks';
import { addCommentAsync } from '../../redux/actions';
import { ROLE } from '../../constants';

const CommentsCotainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const serverRequest = useServerRequest();
	const userRole = useSelector(selectUserRoleId);

	const isGuest = userRole === ROLE.GUEST;

	const onNewCommentAdd = (postId, userId, content) => {
		if (!newComment.trim()) {
			setNewComment('');
			return;
		}

		dispatch(addCommentAsync(serverRequest, postId, userId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						value={newComment}
						type="textarea"
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px"
						size="18px"
						onClick={() => onNewCommentAdd(postId, userId, newComment)}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} postId={postId} />
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsCotainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& .new-comment {
		display: flex;
		margin: 0 0 20px 0;
	}

	& textarea {
		width: 550px;
		height: 120px;
		font-size: 16px;
		resize: none;
	}
`;
