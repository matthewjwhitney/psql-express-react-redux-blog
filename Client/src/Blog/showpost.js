import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ACTIONS from '../store/actions/actions';
import axios from 'axios';
import history from '../utils/history';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



class ShowPost extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      comment: '',
      cid: ''
    }
  }

  componentDidMount() {
    axios.get('/api/get/allpostcomments', {params: { post_id: this.props.location.state.post.post.pid}})
    .then(res => this.props.post_comment_success(res.data))
    .catch(function (error) {
        console.log(error);
      });
  }

  handleClickOpen = (cid, comment) => {
     this.setState({ open: true, comment: comment, cid: cid });
   };

   handleClose = () => {
     this.setState({ open: false, comment: '', cid: '' });
   };

   handleCommentChange = (event) => {
     this.setState({comment: event.target.value})
   }


  handleSubmit = event => {
    event.preventDefault()
    const user_id = this.props.db_profile[0].uid
    const post_id = this.props.location.state.post.post.pid
    const username = this.props.db_profile[0].username
    const data = {comment: event.target.comment.value, post_id: post_id, user_id: user_id, username: username}
    axios.post('/api/post/commenttodb', data)
      .then(res => console.log(res))
      .catch(function (error) {
        console.log(error);
      })
      .then(setTimeout( function() { history.replace('/posts') }, 700))
     }

   handleUpdate = () => {
     const comment = this.state.comment
     const cid = this.state.cid
     const user_id = this.props.db_profile[0].uid
     const post_id = this.props.location.state.post.post.pid
     const username = this.props.db_profile[0].username
     const data = {cid: cid, comment: comment, post_id: post_id, user_id: user_id, username: username}
     axios.put('/api/put/commenttodb', data)
       .then(res => console.log(res))
       .catch(function (error) {
         console.log(error);
       })
       .then(setTimeout( function() { history.replace('/posts') }, 700))
    }

   handleDeleteComment = () => {
     const cid = this.state.cid
     axios.delete('/api/delete/comment', { data: { cid: cid }})
       .then(res => console.log(res))
       .catch(function (error) {
         console.log(error);
       })
       .then(setTimeout( function() { history.replace('/posts') }, 700))
   }

   RenderComments = (props) => (
     <div>
        <h3>{props.comment.comment}</h3>
        <small>{props.comment.date_created}</small>
        <p> By: {props.comment.author} </p>
        { props.cur_user_id === props.comment.user_id
          ? <Button color="danger" onClick={() => this.handleClickOpen(props.comment.cid, props.comment.comment) } > Edit </Button>
          : null
        }
    </div>
    );



render() {
  return (
  <article>
    <div>
      <h2> Post </h2>
        <h4>{this.props.location.state.post.post.title}</h4>
        <p>{this.props.location.state.post.post.body}</p>
        <p> By: {this.props.location.state.post.post.author}</p>
      <h4> Comments: </h4>
      <hr />
        { this.props.db_comments ?
          this.props.db_comments.map(comment =>
              <this.RenderComments key={comment.cid} cur_user_id={ this.props.db_profile[0].uid } comment={comment} />)
          : null
        }

        <form onSubmit={this.handleSubmit}>
          <TextField
            id="comment"
            label="Comment"
            margin="normal"
          />
          <br/>
            <Button variant="contained" color="primary" type="submit" >Submit</Button>
        </form>

    <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Edit Comment </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <input type="text" value={this.state.comment} onChange={ this.handleCommentChange} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {this.handleUpdate(); this.setState({open: false})}} color="primary" autoFocus>
            Agree
          </Button>
          <Button onClick={() => this.handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleDeleteComment()} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
 </div>

</article>

  )}
}

function mapStateToProps(state) {
    return {
        db_profile: state.auth_reducer.DBUserProfile,
        db_comments: state.posts_reducer.db_comments
    };
}

function mapDispatchToProps (dispatch) {
  return {
    post_comment_success: (comments) => dispatch(ACTIONS.get_db_post_comments(comments))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
