import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'incomplete'

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app-container">
      <div className="todo-card">
        <h1 className="todo-title">Todo List</h1>

        <TodoInput onAddTodo={addTodo} />

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === "incomplete" ? "active" : ""}`}
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>
              {filter === "all"
                ? "No tasks yet. Add a new todo!"
                : filter === "completed"
                ? "No completed tasks."
                : "No incomplete tasks."}
            </p>
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <div className="todo-footer">
            <button className="clear-all-btn" onClick={clearAll}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
