import React, {useState, useEffect } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import {toast} from "react-toastify";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const retrivedData = () => JSON.parse(window.localStorage.getItem("todos"));

  const[tasksRemaining, setTasksRemaining] = useState(0);
  const[completedTask, setCompletedTask]= useState(0);
  const[todos, setTodos] = useState(retrivedData);




  useEffect(() => {

    setTasksRemaining(
      todos && todos.filter((todo) => !todo.isCompleted).length
    );
    setCompletedTask(
      todos && todos.filter((todos) => todos.isCompleted).length
    );

    window.localStorage.setItem("todos",JSON.stringify(todos));

  },[todos]);

  const addTodo = (text) => {
    if (todos && todos.length> 0) {
      const newTodos = [...todos,{ text }];
      setTodos(newTodos);
    } else{
      const newTodos = [{ text:text }];
      setTodos(newTodos);
    }
    const warning = text + "is added";
    toast.warn(warning, {
      position: "top-right",
    });
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    const completed = newTodos[index].text + " is completed";
    toast.success(completed,{
      position: "top-right",
    });

    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    const removedTask = newTodos[index].text + " is removed";
    toast.error(removedTask, {
      position: "top-right",
    });
    newTodos.splice(index,1);
    setTodos(newTodos);
  };


  return (
    <div className="app">
      <Container fluid style={{ background: "#209cee", height : "100%"}}>
        <div className="header">My TODOs</div>
        <div className="todo-list">
          <div className="create-task">
            <TodoForm addTodo={addTodo} />
          </div>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Subtitle> Completed task ({completedTask})</Card.Subtitle>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Subtitle> Pending task ({tasksRemaining}) </Card.Subtitle>
              </Card.Body>
            </Card>
          </CardGroup>

          {todos && todos.map((todo,index) => (
            <Todo 
              key={index}
              index={index}
              todo={todo}
              completeTodo = {completeTodo}
              removeTodo={removeTodo}
            />
          ))}

        </div>
      </Container>
    </div>
  ); 
}

export default App;