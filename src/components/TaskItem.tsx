import React, { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  toggleStatus: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, editTask, toggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex justify-between items-center p-3 bg-white shadow-md rounded-lg border">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.status === 'Completed'}
          onChange={() => toggleStatus(task.id)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-grow p-1 border rounded-lg focus:outline-none"
          />
        ) : (
          <span className={`text-gray-800 ${task.status === 'Completed' ? 'line-through' : ''}`}>
            {task.title}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
