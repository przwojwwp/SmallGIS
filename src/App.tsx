import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterSort from './components/FilterSort';
import { Task } from './types';

const getInitialTasks = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks).map((task: Task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
  })) : [];
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (id: number, updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'To Do' ? 'In Progress' : 'Done' } : task
    ));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filter.toLowerCase()) ||
    task.description.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) =>
    sort === 'asc' ? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Task Manager</h1>
      <TaskForm addTask={addTask} />
      <FilterSort filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <TaskList tasks={sortedTasks} editTask={editTask} deleteTask={deleteTask} toggleStatus={toggleStatus} />
    </div>
  );
};

export default App;
