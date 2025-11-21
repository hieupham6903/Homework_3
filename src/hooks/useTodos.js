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

  const reorderTodos = (sourceId, targetId) => {
    if (!sourceId || !targetId || sourceId === targetId) {
      return;
    }

    setTodos((prev) => {
      const sourceIndex = prev.findIndex((todo) => todo.id === sourceId);
      const targetIndex = prev.findIndex((todo) => todo.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) {
        return prev;
      }

      const updated = [...prev];
      const [movedTodo] = updated.splice(sourceIndex, 1);
      updated.splice(targetIndex, 0, movedTodo);
      return updated;
    });
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
    reorderTodos,
    clearAll,
    hasTodos: todos.length > 0,
    stats,
  };
}
