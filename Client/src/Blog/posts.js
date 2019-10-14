import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTIONS from '../store/actions/actions';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const RenderPosts = (post) => (
  <TableRow>
    <TableCell><Link to={{pathname:"/post/" + post.post.pid, state:{post} }}><h4> { post.post.title }</h4></Link>
    <br/>
    <p> { post.post.body } </p>
    </TableCell>
  </TableRow>
);



class Posts extends Component {
  componentDidMount() {
   axios.get('api/get/allposts')
    .then(res => this.props.posts_success(res.data))
    .catch(function (error) {
        console.log(error);
      });
   }


   render() {
    return (
        <div>
         <br />
            <Link to="/newpost">
              <Button variant="contained" color="primary">
                Add Post
              </Button>
            </Link>

            <h1>Posts</h1>
            <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Title </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                   { this.props.dbposts ?
                     this.props.dbposts.map(post =>
                     <RenderPosts key={ post.pid } post={post} />)
                   : null
                   }
                </TableBody>
              </Table>
          </Paper>
       </div>
    )}
}


function mapStateToProps(state) {
    return {
        dbposts: state.posts_reducer.db_posts
    };
}

function mapDispatchToProps (dispatch) {
  return {
    posts_success: (posts) => dispatch(ACTIONS.get_db_posts(posts))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);
