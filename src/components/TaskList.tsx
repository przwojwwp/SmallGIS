import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  toggleStatus: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, editTask, toggleStatus }) => {
  return (
    <div className="mt-4 space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;