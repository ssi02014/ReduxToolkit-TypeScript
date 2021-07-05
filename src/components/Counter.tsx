import React from "react";

interface Props {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onIncreaseBy: (diff: number) => void;
}

const Counter: React.FC<Props> = ({
  count,
  onIncrement,
  onDecrement,
  onIncreaseBy,
}) => {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrement}>+1</button>
      <button onClick={onDecrement}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
};

export default Counter;
