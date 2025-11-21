import useLocalStorage from "./useLocalStorage";
import { generateId } from "../utils/id";
import useFilter, { FILTERS, PRIORITY_FILTERS } from "./useFilter";
export { FILTERS, PRIORITY_FILTERS };

export const PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export default function useTodos() {
  const [todos, setTodos] = useLocalStorage("todo-list", []);

  const addTodo = ({ title, priority }) => {
    if (!title?.trim()) {
      return;
    }

    setTodos((prev) => [
      ...prev,
      {
        id: generateId(),
        title: title.trim(),
        priority: priority || PRIORITIES.MEDIUM,
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, newTitle) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const {
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    searchTerm,
    setSearchTerm,
    filteredTodos,
    stats,
  } = useFilter(todos);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    searchTerm,
    setSearchTerm,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearAll,
    hasTodos: todos.length > 0,
    stats,
  };
}
