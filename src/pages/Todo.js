import React, { useState, useRef, useEffect } from "react";
import TodoLists from "../compoents/TodoLists";
import { uuid } from "uuidv4";

//save our todos is our local storage
const LOCAL_STORAGE_KEY = " todoApp.todos";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  //useRef hook to referece the get access to out value imput
  const todoNameRef = useRef();

  //TO load OUR TO DO from the store US RATHER LETTHEM GO AWAY EVERY TIME WE REFRECHE THE PAGE
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  //TO STORE OUR TO DO
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    console.log(name);
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }];
    });
    //clear our to do after its add to list
    todoNameRef.current.value = null;
  }

  function toggeleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <div>
      <TodoLists todos={todos} toggeleTodo={toggeleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add to do</button>
      <button onClick={handleClearTodos}> clear complete</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </div>
  );
}
