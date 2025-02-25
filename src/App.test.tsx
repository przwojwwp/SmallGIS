import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterSort from './components/FilterSort';
import { Task } from './types';

const initialTasks: Task[] = [
  { id: 1, title: 'Zadanie 1', description: 'Opis zadania 1', status: 'To Do', createdAt: new Date() },
  { id: 2, title: 'Zadanie 2', description: 'Opis zadania 2', status: 'In Progress', createdAt: new Date() },
  // Dodaj więcej zadań...
];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm addTask={addTask} />
      <FilterSort filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <TaskList tasks={sortedTasks} editTask={editTask} deleteTask={deleteTask} toggleStatus={toggleStatus} />
    </div>
  );
};

export default App;
