// frontend/components/Todo/TodoList.js
import React, { useState, useEffect } from 'react';
import { useApi } from '../../context/ApiContext';

const TodoList = ({ userId }) => {
  const { 
    getUserTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskCompletion, 
    tasks, 
    isLoading, 
    error 
  } = useApi();
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');

  // Load tasks when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      loadTasks();
    }
  }, [userId]);

  const loadTasks = async () => {
    try {
      await getUserTasks(userId);
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      await createTask(userId, {
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false,
        user_id: userId
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description || '');
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(userId, editingTask, {
        title: editingTitle,
        description: editingDescription
      });
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(userId, taskId);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleCompletion = async (task) => {
    try {
      await toggleTaskCompletion(userId, task.id);
    } catch (err) {
      console.error('Error toggling task completion:', err);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Todo List</h1>
      
      {/* Add Task Form */}
      <form onSubmit={handleCreateTask} className="mb-8 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="md:col-span-1">
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Description (optional)..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>

      {/* Tasks List */}
      <div className="space-y-4">
        {(tasks || []).map((task) => (
          <div 
            key={task.id} 
            className={`p-4 rounded-lg shadow-md flex items-center justify-between ${
              task.completed 
                ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-l-4 border-green-500' 
                : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-l-4 border-blue-500'
            }`}
          >
            {editingTask === task.id ? (
              // Editing mode
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="px-3 py-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 col-span-2"
                />
                <input
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  className="px-3 py-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ) : (
              // Display mode
              <div className="flex-grow">
                <div className="flex items-center">
                  <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {task.title}
                  </span>
                  {task.completed && (
                    <span className="ml-2 px-2 py-1 bg-green-800 text-green-200 text-xs rounded-full">
                      Completed
                    </span>
                  )}
                </div>
                {task.description && (
                  <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                )}
              </div>
            )}

            <div className="flex space-x-2 ml-4">
              {editingTask === task.id ? (
                <>
                  <button
                    onClick={handleUpdateTask}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleToggleCompletion(task)}
                    className={`${
                      task.completed 
                        ? 'bg-yellow-600 hover:bg-yellow-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white px-3 py-1 rounded text-sm`}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => startEditing(task)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {(!tasks || tasks.length === 0) && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          <p>No tasks yet. Add a new task to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;