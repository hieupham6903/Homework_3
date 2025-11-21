import { useState } from "react";
import TodoSearch from "../components/TodoSearch";
import TodoItem from "../components/TodoItem";
import AddTodoModal from "../components/AddTodoModal";
import useTodos, { FILTERS, PRIORITY_FILTERS } from "../hooks/useTodos";
import { useTheme, THEMES } from "../contexts/ThemeContext";
import "../styles/TodoList.css";

const PRIORITY_FILTER_OPTIONS = [
  { label: "All", value: PRIORITY_FILTERS.ALL },
  { label: "High", value: PRIORITY_FILTERS.HIGH },
  { label: "Medium", value: PRIORITY_FILTERS.MEDIUM },
  { label: "Low", value: PRIORITY_FILTERS.LOW },
];

function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearAll,
    hasTodos,
    searchTerm,
    setSearchTerm,
    stats,
  } = useTodos();
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="todo-app-container">
      <div className="todo-card">
        <div className="todo-header">
          <h1 className="todo-title">Todo List</h1>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-pressed={theme === THEMES.DARK}
          >
            {theme === THEMES.LIGHT ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        <TodoSearch
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenModal={handleOpenModal}
        />

        <div className="filter-row">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === FILTERS.ALL ? "active" : ""}`}
              onClick={() => setFilter(FILTERS.ALL)}
            >
              {`All (${stats.total})`}
            </button>
            <button
              className={`filter-btn ${
                filter === FILTERS.COMPLETED ? "active" : ""
              }`}
              onClick={() => setFilter(FILTERS.COMPLETED)}
            >
              {`Completed (${stats.completed})`}
            </button>
            <button
              className={`filter-btn ${
                filter === FILTERS.INCOMPLETE ? "active" : ""
              }`}
              onClick={() => setFilter(FILTERS.INCOMPLETE)}
            >
              {`Incomplete (${stats.incomplete})`}
            </button>
          </div>
          <div className="priority-filter">
            <div className="priority-select-wrapper">
              <select
                id="priority-filter-select"
                className="priority-select"
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
              >
                {PRIORITY_FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>
              {filter === FILTERS.ALL
                ? "No tasks yet. Add a new todo!"
                : filter === FILTERS.COMPLETED
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

        {hasTodos && (
          <div className="todo-footer">
            <button className="clear-all-btn" onClick={clearAll}>
              Clear All
            </button>
          </div>
        )}
      </div>

      <AddTodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={addTodo}
      />
    </div>
  );
}

export default TodoPage;
