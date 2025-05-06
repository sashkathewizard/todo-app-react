import React from "react";
import "../../styles/todo.scss";
import { TodoStatus } from "../../utils/enums/status.enum";

interface TodoProps {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ id, title, description, status, onToggleComplete, onDelete }) => {
  const completed = status === TodoStatus.DONE;

  return (
    <div className={`todo-item ${completed ? "completed" : ""}`}>
      <div className="todo-content">
        <h3 className="todo-title">{title}</h3>
        {description && <p className="todo-description">{description}</p>}
      </div>
      <div className="todo-actions">
        <button className="todo-toggle" onClick={() => onToggleComplete(id)}>
          {completed ? TodoStatus.IN_PROGRESS : TodoStatus.DONE}
        </button>
        <button className="todo-delete" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;