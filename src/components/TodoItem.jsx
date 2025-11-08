import { useState, useEffect } from "react";
import "./TodoItem.css";

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  useEffect(() => {
    if (!isEditing) {
      setEditText(todo.text);
    }
  }, [todo.text, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}`}
          disabled={isEditing}
        />
        {isEditing ? (
          <input
            type="text"
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`todo-text ${todo.completed ? "completed" : ""}`}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="todo-actions">
        {!isEditing && (
          <button
            className="edit-btn"
            onClick={handleEdit}
            aria-label="Edit todo"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 2.00001C11.5084 1.8249 11.7163 1.68601 11.9444 1.5913C12.1726 1.49659 12.4163 1.448 12.6622 1.448C12.9081 1.448 13.1518 1.49659 13.38 1.5913C13.6081 1.68601 13.816 1.8249 13.9911 2.00001C14.1662 2.17512 14.3051 2.38305 14.3998 2.61119C14.4945 2.83933 14.5431 3.08301 14.5431 3.3289C14.5431 3.57479 14.4945 3.81847 14.3998 4.04661C14.3051 4.27475 14.1662 4.48268 13.9911 4.65779L5.32444 13.3245L1.33333 14.6667L2.67555 10.6756L11.3333 2.00001Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
