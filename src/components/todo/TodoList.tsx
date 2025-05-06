import React, { useEffect, useState } from "react";
import { deleteTodoById, fetchUserTodos } from "../../api/todoApi";
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

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === TodoStatus.NEW ? TodoStatus.DONE : TodoStatus.NEW,
            }
          : todo
      )
    );
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