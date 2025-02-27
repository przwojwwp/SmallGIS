import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  toggleStatus: (id: string) => void;
  darkMode: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, editTask, toggleStatus, darkMode }) => {
  return (
    <div className="mt-4 space-y-2">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <TaskItem
              task={task}
              deleteTask={deleteTask}
              editTask={editTask}
              toggleStatus={toggleStatus}
              darkMode={darkMode}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
