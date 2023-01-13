/***
* STEPS:
***/

const { legacy_createStore } = require('redux')

// initial state
const initialState = { count: 0 }
// actions - action - action creator
// action
{
  type: "INCREMENT"
}
// ACTION CREATOR
const incrementAction = () => {
  return {
    type: "INCREMENT"
  }
}

const decrementAction = () => {
  return {
    type: "DECREMENT"
  }
}

const resetAction = () => {
  return {
    type: "RESET"
  }
}

const incrementByAmtAction = () => {
  return {
    type: "INCREMENT_BY_AMT"
  }
}

// reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case 'RESET':
      return {
        count: 0
      }

    case 'INCREMENT_BY_AMT':
      return {
        count: 0
      }
      default: 
      return {count: 0}
  }
}

// store

const store = legacy_createStore(counterReducer);

// subscribe to store
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
})

// dispatch action
store.dispatch(incrementAction());
