//Reducer for handling posts api call
import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  db_posts: [],
  db_comments: []
}

const Posts_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DB_POSTS_SUCCESS:
      return {
        ...state,
        db_posts: action.payload
      }
    case ACTION_TYPES.REMOVE_DB_POSTS:
      return {
        ...state,
        db_posts: []
      }
    case ACTION_TYPES.FETCH_DB_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        db_comments: action.payload
      }
    case ACTION_TYPES.FETCH_DB_POST_COMMENTS_FAILURE:
      return {
        ...state,
        db_comments: []
      }
    default:
      return state
    }
}

export default Posts_Reducer;
