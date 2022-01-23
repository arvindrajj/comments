import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], name: '', comment: '', count: 0}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state

    if (name === '' || comment === '') {
      // eslint-disable-next-line no-alert
      alert('Enter Valid Input')
    } else {
      const randomNumber = Math.floor(
        Math.random() * initialContainerBackgroundClassNames.length,
      )
      const randomColor = initialContainerBackgroundClassNames[randomNumber]
      const newComment = {
        id: uuidv4(),
        name,
        comment,
        randomColor,
        isLiked: false,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
      }))
      this.setState(prevState => ({count: prevState.count + 1}))
    }
  }

  onLikeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (each.id === id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(each => each.id !== id)
    this.setState({commentsList: filteredCommentsList})
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  render() {
    const {commentsList, name, comment, count} = this.state

    return (
      <div className="container">
        <div className="card-container">
          <form className="form-container" onSubmit={this.onAddComment}>
            <h1 className="heading">Comments</h1>
            <p className="description">Say something about 4.0 Technologies</p>
            <input
              type="text"
              value={name}
              placeholder="Your Name"
              className="name"
              onChange={this.onChangeName}
            />
            <textarea
              value={comment}
              rows="8"
              placeholder="Your Comment"
              cols="40"
              className="comment"
              onChange={this.onChangeComment}
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="img"
          />
        </div>
        <hr className="line" />
        <div className="total-comments">
          <p className="count">{count}</p>
          <p className="comments">comments</p>
        </div>
        <ul className="comments-container">
          {commentsList.length > 0 &&
            commentsList.map(each => (
              <CommentItem
                key={each.id}
                commentsList={each}
                initialContainerBackgroundClassNames={
                  initialContainerBackgroundClassNames
                }
                onLikeComment={this.onLikeComment}
                onDeleteComment={this.onDeleteComment}
              />
            ))}
        </ul>
      </div>
    )
  }
}

export default Comments
