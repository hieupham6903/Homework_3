import { useMemo, useState } from "react";

export const FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
};

export const PRIORITY_FILTERS = {
  ALL: "all",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export default function useFilter(todos) {
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [priorityFilter, setPriorityFilter] = useState(PRIORITY_FILTERS.ALL);
  const [searchTerm, setSearchTerm] = useState("");

  const searchFilteredTodos = useMemo(() => {
    if (!searchTerm.trim()) {
      return todos;
    }

    const query = searchTerm.trim().toLowerCase();
    return todos.filter((todo) => todo.title.toLowerCase().includes(query));
  }, [todos, searchTerm]);

  const priorityFilteredTodos = useMemo(() => {
    if (priorityFilter === PRIORITY_FILTERS.ALL) {
      return searchFilteredTodos;
    }

    return searchFilteredTodos.filter((todo) => {
      const todoPriority = (todo.priority ?? "").toLowerCase();
      return todoPriority === priorityFilter;
    });
  }, [searchFilteredTodos, priorityFilter]);

  const filteredTodos = useMemo(() => {
    return priorityFilteredTodos.filter((todo) => {
      if (filter === FILTERS.COMPLETED) {
        return todo.completed;
      }
      if (filter === FILTERS.INCOMPLETE) {
        return !todo.completed;
      }
      return true;
    });
  }, [priorityFilteredTodos, filter]);

  const stats = useMemo(() => {
    const completedCount = priorityFilteredTodos.filter(
      (todo) => todo.completed
    ).length;
    const total = priorityFilteredTodos.length;
    return {
      total,
      completed: completedCount,
      incomplete: total - completedCount,
    };
  }, [priorityFilteredTodos]);

  return {
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    searchTerm,
    setSearchTerm,
    filteredTodos,
    stats,
  };
}
