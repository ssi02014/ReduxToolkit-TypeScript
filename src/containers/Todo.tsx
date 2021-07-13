import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "../components/TodoList";
import { RootState } from "../features/store";
import { getList } from "../features/todos";

interface Props {}

const Todo: React.FC<Props> = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todoReducer);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <form action="">
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button type="submit">추가</button>
      <ul>
        {todoList.map((list) => (
          <TodoList
            key={list.id}
            userId={list.userId}
            id={list.id}
            title={list.title}
            body={list.body}
          />
        ))}
      </ul>
    </form>
  );
};

export default Todo;
