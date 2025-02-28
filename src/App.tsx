import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterSort from './components/FilterSort';
import { Task } from './types';

const initialTasks: Task[] = [
  { id: uuidv4(), title: 'Zadanie 1', status: 'Active', createdAt: new Date() },
  { id: uuidv4(), title: 'Zadanie 2', status: 'Completed', createdAt: new Date() },
  { id: uuidv4(), title: 'Zadanie 3', status: 'Active', createdAt: new Date() },
  { id: uuidv4(), title: 'Zadanie 4', status: 'Completed', createdAt: new Date() },
];

const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks
    ? JSON.parse(savedTasks).map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }))
    : initialTasks;
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage());
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const clearCompletedTasks = () => {
    const newTasks = tasks.filter((task) => task.status !== 'Completed');
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const editTask = (id: string, newTitle: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const toggleStatus = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === 'Active' ? ('Completed' as 'Completed') : ('Active' as 'Active'),
          }
        : task
    );
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const filteredTasks = tasks
    .filter((task) => filterStatus === 'All' || task.status === filterStatus)
    .filter((task) => task.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
      <div
        className={`shadow-lg rounded-lg p-6 w-full max-w-lg transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">To-Do List</h1>
          <button
            onClick={toggleDarkMode}
            className={`px-3 py-1 border rounded transition-colors duration-300 ${
              darkMode ? 'border-gray-500' : 'border-gray-300'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <TaskForm addTask={addTask} darkMode={darkMode} />
        <FilterSort
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          query={query}
          setQuery={setQuery}
          darkMode={darkMode}
        />
        <TaskList
          tasks={filteredTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleStatus={toggleStatus}
          darkMode={darkMode}
          hasCompletedTasks={tasks.some((task) => task.status === 'Completed')}
          clearCompletedTasks={clearCompletedTasks}
        />
      </div>
    </div>
  );
};

export default App;
