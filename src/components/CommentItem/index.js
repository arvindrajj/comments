import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentsList, onLikeComment, onDeleteComment} = props
  const {name, comment, isLiked, id, randomColor} = commentsList
  const firstLetter = name[0].toUpperCase()
  const imageSrc = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const classNameOfLike = isLiked ? 'liked' : 'like'
  const likeComment = () => {
    onLikeComment(id)
  }
  const deleteComment = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment-container">
      <div className="profile-container">
        <p className={`profile ${randomColor}`}>{firstLetter}</p>
        <div className="name-container">
          <h1 className="profile-name">{name}</h1>
          <p className="date">{formatDistanceToNow(new Date())}</p>
        </div>
      </div>
      <p className="comment-input">{comment}</p>
      <div className="footer">
        <button type="button" className="like-button" onClick={likeComment}>
          <img src={imageSrc} alt="like" className="like-img" />
          <p className={classNameOfLike}>Like</p>
        </button>
        <button
          type="button"
          className="delete-button"
          testId="delete"
          onClick={deleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}

export default CommentItem
