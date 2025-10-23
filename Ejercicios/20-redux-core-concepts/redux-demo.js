const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  const { type, payload } = action;

  if (type === "ADD") {
    return {
      ...state,
      counter: state.counter + payload,
    };
  } else if (type === "SUBSTRACT") {
    return {
      ...state,
      counter: state.counter - payload,
    };
  }

  return { ...state };
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({
  type: "ADD",
  payload: 10,
});

store.dispatch({
  type: "SUBSTRACT",
  payload: 5,
});

store.dispatch({
  type: "ADD",
  payload: 2,
});
