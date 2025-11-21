import "../styles/TodoSearch.css";

function TodoSearch({ searchValue, onSearchChange, onOpenModal }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        className="todo-input"
        placeholder="Search tasks"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className="add-btn" type="button" onClick={onOpenModal}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4V16M4 10H16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  );
}

export default TodoSearch;
