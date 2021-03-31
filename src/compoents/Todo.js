import React from "react";

export default function Todo({ todo, toggeleTodo }) {
  function handleTodoClick() {
    toggeleTodo(todo.id);
  }
  return (
    <div>
      <lable>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
      </lable>
    </div>
  );
}
