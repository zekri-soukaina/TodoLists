import React from "react";
import Todo from "./Todo";

export default function TodoLists({ todos, toggeleTodo }) {
  return (
    <div>
      <p> Building a TodoLists </p>
      <p> how many todo we have :{todos.length}</p>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} toggeleTodo={toggeleTodo} />;
      })}
    </div>
  );
}
