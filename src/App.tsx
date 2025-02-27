import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterSort from './components/FilterSort';
import { Task } from './types';

const initialTasks: Task[] = [
  { id: 1, title: 'Zadanie 1', status: 'Active', createdAt: new Date() },
  { id: 2, title: 'Zadanie 2', status: 'Active', createdAt: new Date() },
];

const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks).map((task: Task) => ({
      ...task,
      createdAt: new Date(task.createdAt), // Konwertuj string na Date
    }));
  }
  return initialTasks;
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage());
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const editTask = (id: number, newTitle: string) => {
    const newTasks = tasks.map(task => task.id === id ? { ...task, title: newTitle } : task);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const toggleStatus = (id: number) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'Active' ? 'Completed' : 'Active' } : task
    ) as Task[]; // Jawnie określamy typ jako Task[]
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) =>
    sort === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">To-Do List</h1>
        <TaskForm addTask={addTask} />
        <FilterSort filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        <TaskList
          tasks={sortedTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleStatus={toggleStatus}
        />
      </div>
    </div>
  );
};

export default App;
