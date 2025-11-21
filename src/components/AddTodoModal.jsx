import { useState, useEffect } from "react";
import "../styles/AddTodoModal.css";
import { PRIORITIES } from "../hooks/useTodos";

const PRIORITY_OPTIONS = [
  { label: "Low", value: PRIORITIES.LOW },
  { label: "Medium", value: PRIORITIES.MEDIUM },
  { label: "High", value: PRIORITIES.HIGH },
];

function AddTodoModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(PRIORITIES.MEDIUM);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setPriority(PRIORITIES.MEDIUM);
    }
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ title, priority });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Task</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <label className="modal-field">
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </label>
          <label className="modal-field">
            <span>Priority</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-footer">
            <button type="button" className="modal-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodoModal;
