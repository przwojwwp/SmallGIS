import React, { useState } from 'react';
import { Task } from '../types';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: 'To Do',
      createdAt: new Date(),
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tytuł zadania"
        className="p-2 border rounded mr-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Opis zadania"
        className="p-2 border rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Dodaj zadanie
      </button>
    </form>
  );
};

export default TaskForm;
