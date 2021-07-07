import React from "react";
import Counter from "../components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/store";
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from "../features/counter";

interface Props {}

const CounterContainer: React.FC<Props> = () => {
  const count = useSelector((state: RootState) => state.counterSlice.value);

  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다

  // 각 액션들을 디스패치하는 함수들을 만들어줍니다
  const onIncrement = () => {
    dispatch(increment());
  };

  const onDecrement = () => {
    dispatch(decrement());
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(incrementByAmount(diff));
  };

  const onIncrementAsync = (count: number) => {
    dispatch(incrementAsync(count));
  };

  return (
    <>
      <Counter
        count={count}
        onIncrementAsync={onIncrementAsync}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onIncreaseBy={onIncreaseBy}
      ></Counter>
    </>
  );
};

export default CounterContainer;
