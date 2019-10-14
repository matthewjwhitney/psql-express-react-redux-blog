import * as ACTION_TYPES from './action_types';

/*eslint-disable */
// Plain Actions
{ type : ACTION_TYPES.LOGIN_FAILURE }

{ type : ACTION_TYPES.LOGIN_SUCCESS }

{ type: ACTION_TYPES.GET_PROFILE }

{ type: ACTION_TYPES.REMOVE_PROFILE }

{ type:ACTION_TYPES.SET_DB_PROFILE }

{ type: ACTION_TYPES.REMOVE_DB_PROFILE }

{ type: ACTION_TYPES.FETCH_DB_POSTS_SUCCESS }

{ type: ACTION_TYPES.REMOVE_DB_POSTS }

{ type: ACTION_TYPES.FETCH_DB_POST_COMMENTS_SUCCESS }

{ type: ACTION_TYPES.FETCH_DB_POST_COMMENTS_FAILURE }


//Async actions to handle authentication state
export function login_success() {
  return dispatch => {
      dispatch({type: ACTION_TYPES.LOGIN_SUCCESS})
  }
}

export function login_failure() {
  return dispatch => {
    dispatch({type: ACTION_TYPES.LOGIN_FAILURE})
  }
}

//Actions for  getting profile
export function get_profile(profile) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.GET_PROFILE, payload: profile})
  }
}

export function remove_profile() {
  return dispatch => {
      dispatch({type: ACTION_TYPES.REMOVE_PROFILE})
  }
}

//Set profile in store from sql db
export function set_db_profile(profile) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.SET_DB_PROFILE, payload: profile})
  }
}

export function remove_db_profile() {
  return dispatch => {
      dispatch({type: ACTION_TYPES.REMOVE_DB_PROFILE})
  }
}

//Get posts from the db based on user id
export function get_db_posts(posts) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.FETCH_DB_POSTS_SUCCESS, payload: posts})
  }
}

export function remove_db_posts() {
  return dispatch => {
      dispatch({type: ACTION_TYPES.REMOVE_DB_POSTS})
  }
}

//Get comments for one post
export function get_db_post_comments(comments) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.FETCH_DB_POST_COMMENTS_SUCCESS, payload: comments})
  }
}

export function remove_db_post_comments() {
  return dispatch => {
      dispatch({type: ACTION_TYPES.FETCH_DB_POST_COMMENTS_FAILURE})
  }
}
