import React, { useState } from 'react';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  addTask: (task: Task) => void;
  darkMode: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, darkMode }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      id: uuidv4(),
      title,
      status: 'Active',
      createdAt: new Date(),
    });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className={`flex-grow p-2 border rounded-lg focus:outline-none transition-colors duration-300 ${
          darkMode ? 'bg-gray-700 text-white border-gray-500' : 'bg-white text-black border-gray-300'
        }`}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Dodaj zadanie
      </button>
    </form>
  );
};

export default TaskForm;
