import React, { useEffect, useState } from "react";
import { deleteTodoById, fetchUserTodos, updateTodoStatusById } from "../../api/todoApi";
import { TodoStatus } from "../../utils/enums/status.enum";
import Todo from "./Todo";


interface TodoItem {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchUserTodos();
        setTodos(fetchedTodos);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadTodos();
  }, []);

  const toggleComplete = async (id: string, currentStatus: string) => {
    const newStatus =
      currentStatus === TodoStatus.NEW ? TodoStatus.DONE : TodoStatus.NEW;
  
    try {
      await updateTodoStatusById(id, newStatus);
  
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const deleteTodo = async (id: string) => {
    await deleteTodoById(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;