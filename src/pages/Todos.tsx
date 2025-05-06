import React, { useState } from 'react';
import TodoList from '../components/todo/TodoList';
import { Button } from '../components/Button';
import CreateTodoModal from '../components/todo/CreateTodoModal';
import { createTodo } from '../api/todoApi';

const Todos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTodo = async (title: string, description: string) => {
    console.log("New Todo Created:", { title, description });
    await createTodo(title, description);
  };

  return (
    <div>
        <h1>TodoList v0 app</h1>
        <Button
            text="Add todo"
            className="auth-button"
            onClick={() => setIsModalOpen(true)}
        />
        <TodoList />
        <CreateTodoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateTodo}
        />
    </div>
);
};

export default Todos;