const { legacy_createStore } = require('redux')

// initial state
const initiateState = {
  posts: []
}
// actions(action, action creator)

// action types
const POST = {
  ADD: "ADD_POST",
  REMOVE: "REMOVE_POST"
};

// add post creator
const addPostAction = (post) => {
  return {
    type: POST.ADD,
    payload: post
  }
}

// remove post
const removePostAction = (id) => {
  return {
    type: POST.REMOVE,
    payload: id
  }
}

// reducer
const postReducer = (state = initiateState, action) => {
  switch (action.type) {
    case POST.ADD:
      return {
        posts: [...state.posts, action.payload]
      }
    case POST.REMOVE:
      return {
        posts: state.posts.filter((post) => post.id != action.payload)
      }
    default:
      return state;
  }
}

// store
const store = legacy_createStore(postReducer)

// subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
})

// dispatch
store.dispatch(addPostAction({
  id: 1,
  title: "Hello World",
  description: "lorem ipsum 1"
}));

store.dispatch(addPostAction({
  id: 2,
  title: "Hello World 2",
  description: "lorem ipsum 2"
}))
store.dispatch(addPostAction({
  id: 3,
  title: "Hello World 3",
  description: "lorem ipsum 3"
}))

store.dispatch(removePostAction(1))