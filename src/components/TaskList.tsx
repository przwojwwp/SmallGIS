import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  toggleStatus: (id: string) => void;
  clearCompletedTasks: () => void;
  hasCompletedTasks: boolean;
  darkMode: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  editTask,
  toggleStatus,
  clearCompletedTasks,
  hasCompletedTasks,
  darkMode,
}) => {
  return (
    <div className="space-y-2">
            {hasCompletedTasks && (
        <button
          onClick={clearCompletedTasks}
          className={`mt-4 w-full px-4 py-2 rounded transition-colors duration-300 ${
            darkMode
              ? "bg-red-700 hover:bg-red-800 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          Clear Completed
        </button>
      )}
      <AnimatePresence>
        {tasks.map((task) => (
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
