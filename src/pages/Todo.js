import React, { useState, useRef, useEffect } from "react";
import TodoLists from "../compoents/TodoLists";
import { uuid } from "uuidv4";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";

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
      <Jumbotron
        style={{
          backgroundColor: "#ffdae9",
          color: "gray",
        }}>
        <h1>make its started!</h1>
      </Jumbotron>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title> Building your TodoLists </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <TodoLists todos={todos} toggeleTodo={toggeleTodo} />
        </Modal.Body>

        <Modal.Footer>
          <InputGroup>
            <FormControl
              placeholder="what you wanna do next.."
              ref={todoNameRef}
              // aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="secondary" onClick={handleAddTodo}>
                Add to do
              </Button>
              <Button variant="primary" onClick={handleClearTodos}>
                {" "}
                clear complete
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Badge pill variant="danger">
            {todos.filter((todo) => !todo.complete).length} left to go!
          </Badge>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
