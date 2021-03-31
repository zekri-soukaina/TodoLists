import React from "react";
import Todo from "./Todo";
import Badge from "react-bootstrap/Badge";

export default function TodoLists({ todos, toggeleTodo }) {
  return (
    <div>
      <Badge pill variant="success">
        {todos.length} Todos
      </Badge>
      <br /> <br />
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} toggeleTodo={toggeleTodo} />;
      })}
    </div>
  );
}
