import  React  from "react";
import { Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

function Todo({todo, index, completeTodo,removeTodo}) {
    
    return (
        <div className="todo"
             style={{textDecoration: todo.isComplete ? "line-through" : ""}}
        >
            <div>
                {todo.text}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>

            <div>
                <Button
                    variant="success"
                    size="sm"
                    onClick={() => completeTodo(index)}
                > Complete </Button>
                <Button variant="danger" size="sm" onClick={() => removeTodo(index)}>
                    X
                </Button>

            </div>
        </div>
    )
}

export default Todo;