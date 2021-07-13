import React from "react";

interface Props {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const TodoList: React.FC<Props> = ({ userId, id, title, body }) => {
  return (
    <div style={{ margin: "20px" }}>
      <label>userId: {userId}</label> <br />
      <label>id: {id}</label> <br />
      <label>title: {title}</label> <br />
      <label>body: {body}</label> <br />
    </div>
  );
};

export default TodoList;
