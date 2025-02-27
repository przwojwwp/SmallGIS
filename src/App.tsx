import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterSort from './components/FilterSort';
import { Task } from './types';

const initialTasks: Task[] = [
  { id: uuidv4(), title: 'Zadanie 1', status: 'Active', createdAt: new Date() },
  { id: uuidv4(), title: 'Zadanie 2', status: 'Active', createdAt: new Date() },
  { id: uuidv4(), title: 'Zadanie 3', status: 'Active', createdAt: new Date() },
  { id: uuidv4(), title: 'Zadanie 4', status: 'Active', createdAt: new Date() },
];

const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks).map((task: Task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  }
  return initialTasks;
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage());
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const editTask = (id: string, newTitle: string) => {
    const newTasks = tasks.map(task => task.id === id ? { ...task, title: newTitle } : task);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const toggleStatus = (id: string) => {
    const newTasks = tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === "Active" ? "Completed" : "Active" as "Active" | "Completed" }
        : task
    );
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const filteredTasks = tasks
    .filter(task => filterStatus === 'All' || task.status === filterStatus)
    .filter(task => task.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">To-Do List</h1>
        <TaskForm addTask={addTask} />
        <FilterSort filterStatus={filterStatus} setFilterStatus={setFilterStatus} query={query} setQuery={setQuery} />
        <TaskList
          tasks={filteredTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleStatus={toggleStatus}
        />
      </div>
    </div>
  );
};

export default App;
