import React, { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  editTask: (id: number, updatedTask: Task) => void;
  deleteTask: (id: number) => void;
  toggleStatus: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, editTask, deleteTask, toggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    editTask(task.id, { ...task, title, description });
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
            Zapisz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => toggleStatus(task.id)} className="bg-green-500 text-white p-2 rounded mr-2">
            Zmień status
          </button>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded mr-2">
            Edytuj
          </button>
          <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-2 rounded">
            Usuń
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
