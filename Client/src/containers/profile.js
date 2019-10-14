import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as ACTIONS from '../store/actions/actions';

import axios from 'axios';
import history from '../utils/history';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



class Profile extends Component {
  constructor() {
    super()
    this.state = {
         open: false,
         post_id: null
       }
  }

  componentDidMount() {
    const userid = this.props.db_profile[0].uid
    axios.get('/api/get/userposts', {params: {userid: userid}})
      .then(res =>  this.props.db_posts_success(res.data))
      .catch(function (error) {
          console.log(error);
        })
   }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, post_id: null });
  };



  RenderProfile = (props) => (
    <div className="FlexColumn">
    <Paper>
     <div className="FlexProfileDrawerRow">
       <h1>Welcome:
       <br />
          {props.profile.profile.nickname}
       </h1>
     </div>
     <div className="FlexProfileDrawerRow">
      <img src={props.profile.profile.picture} alt="" />
     </div>
     <div className="FlexProfileDrawerRow">
      <h4> Email:
      <br />
        { props.profile.profile.email }
       </h4>
    </div>
    <div className="FlexProfileDrawerRow">
      <h4> Name:
        <br />
        { props.profile.profile.name }
      </h4>
   </div>
   <div className="FlexProfileDrawerRow">
    <h4> Email Verified: { props.profile.profile.email_verified ? <p>Yes</p> : <p> No</p> } </h4>
  </div>
  </Paper>
</div>);


RenderPosts = (post) => (
 <Card style={{width: '500px', height: '200px', marginBottom: '10px', paddingBottom: '80px' }}>
    <CardHeader
      title={<Link to={{pathname:"/post/" + post.post.pid, state:{post} }}>{ post.post.title }</Link>}
      subheader={
                <div className="FlexColumn">
                  <div className="FlexRow">{ post.post.date_created }</div>
                  <div className="FlexRow">
                      <button><Link to={{pathname:"/editpost/" + post.post.pid, state:{post} }}>Edit</Link></button>
                      <button onClick={() => this.setState({open: true, post_id: post.post.pid})}>Delete</button>
                  </div>
                </div> }
    />
    <hr className="style-two" />
    <CardContent>
        <span style={{ overflow: 'hidden'}}>{ post.post.body } </span>
    </CardContent>
  </Card>
  )



   DeletePost = () => {
     const post_id = this.state.post_id
     axios.delete('/api/delete/postcomments', { data: { post_id: post_id }})
     .then(() =>{ axios.delete('/api/delete/post', { data: { post_id: post_id }})
        .then(res => console.log(res))  })
     .catch(function (error) {
         console.log(error);
       })
     .then(() => this.handleClose())
     .then(() => setTimeout( function() { history.replace('/') }, 700))
   }



 render() {
    return (
  <div className="FlexRow">
      <div className="FlexProfileDrawer">
        <span>{  <this.RenderProfile profile={this.props.profile} /> }</span>
      </div>

      <div className="FlexColumnProfile">
        <Typography align='center' variant="display1">  My Posts </Typography>
        { this.props.dbposts ?
           this.props.dbposts.map(post =>
              <this.RenderPosts key={ post.pid } post={post} />
            )
        : null
        }
      </div>


      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> Confirm Delete? </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleteing Post
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.DeletePost()} color="primary" autoFocus>
              Agree
            </Button>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    )}
}



function mapStateToProps(state) {
    return {
        profile: state.auth_reducer.UserProfile,
        db_profile: state.auth_reducer.DBUserProfile,
        dbposts: state.posts_reducer.db_posts
    };
}

function mapDispatchToProps (dispatch) {
  return {
    profile_success: (profile) => dispatch(ACTIONS.get_profile(profile)),
    db_posts_success: (posts) => dispatch(ACTIONS.get_db_posts(posts))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
