const { legacy_createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default;
const axios = require('axios');
const loggerMiddleware = require('redux-logger').createLogger()

// action type constant
const FETCH = {
  STARTED: "STARTED",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
}

// custom middleware
const customLogger = () => {
  return next => {
    return action => {
      console.log('Action fire', action);
      next(action)
    }
  }
}

const initialState = { posts: [], error: '', loading: false }
const userInitialState = { users: [] }

// actions
const fetchPostRequest = () => {
  return {
    type: FETCH.STARTED
  }
}
const fetchPostSuccess = (posts) => {
  return {
    type: FETCH.SUCCESS, 
    payload: posts
  }
}
const fetchPostFailed = (error) => {
  return {
    type: FETCH.FAILED,
    payload: error
  }
}

// action to make the request
const fetchPosts = () => async (dispatch) => {
  try {
    // dispatch
    dispatch(fetchPostRequest())
    const data  = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch(fetchPostSuccess(data))
    console.log(data);
  } catch (error) {
    console.log(error)
    dispatch(fetchPostFailed(error.message))
  } 
}


// reducers
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH.STARTED:
      return {
        ...state,
        loading: true
      }
    case FETCH.SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case FETCH.FAILED:
      return {
        posts: [],
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}

// store
const store = legacy_createStore(postsReducer, applyMiddleware(thunk))

store.subscribe(() => {
  const data = store.getState();
  console.log(data);
})

// dispatch
store.dispatch(fetchPostRequest());
store.dispatch(fetchPosts());
