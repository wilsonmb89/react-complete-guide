import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";
import { toogleCounter, increment, decrement } from "../store/counter-store";
/* import { COUNTER_REDUCER_TYPES } from "../store"; */

const Counter = () => {
  const dispatch = useDispatch();

  const counter = useSelector((store) => store.counterState.counter);
  const isCounterVisible = useSelector((store) => store.counterState.isCounterVisible);

  const toggleCounterHandler = () => {
    // dispatch({ type: COUNTER_REDUCER_TYPES.TOGGLE_COUNTER, payload: null });
    dispatch(toogleCounter());
  };

  const onClickIncrementButtonHandler = () => {
    // dispatch({ type: COUNTER_REDUCER_TYPES.INCREMENT, payload: 1 });
    dispatch(increment(1));
  };

  const onClickDrecrementButtonHandler = () => {
    // dispatch({ type: COUNTER_REDUCER_TYPES.DECREMENT, payload: 1 });
    dispatch(decrement(1));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {isCounterVisible && (
        <>
          <div className={classes.value}>{counter}</div>
          <div className="container-buttons">
            <button onClick={onClickIncrementButtonHandler}>Increment</button>
            <button onClick={onClickDrecrementButtonHandler}>Decrement</button>
          </div>
        </>
      )}
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
