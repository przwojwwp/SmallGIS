import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  editTask: (id: number, updatedTask: Task) => void;
  deleteTask: (id: number) => void;
  toggleStatus: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, editTask, deleteTask, toggleStatus }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
