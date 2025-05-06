import React, { useState } from "react";
import "../../styles/modal.scss";
import { Input } from "../Input";
import { Button } from "../Button";

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

const CreateTodoModal: React.FC<CreateTodoModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    onCreate(title, description);
    setTitle("");
    setDescription("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Todo</h2>
        {error && <p className="modal-error">{error}</p>}
        <Input
          type="text"
          placeholder="Title"
          inputValue={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-textarea"
        />
        <div className="modal-actions">
          <Button className="modal-button" text="Create" onClick={handleCreate}/>
          <Button className="modal-button-secondary" text="Cancel" onClick={onClose}/>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoModal;