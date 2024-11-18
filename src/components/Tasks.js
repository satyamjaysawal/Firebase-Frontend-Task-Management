import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

// Get the API base URL from environment variables
const apiUrl = process.env.REACT_APP_API_BASE_URL;
console.log("API URL from .env: ", apiUrl);

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tasks`);
        setTasks(response.data);
      } catch (err) {
        setError("Error fetching tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!task.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    if (tasks.some((t) => t.task.toLowerCase() === task.toLowerCase())) {
      setError("Task already exists.");
      return;
    }

    const newTask = { task, completed: false };
    try {
      const response = await axios.post(`${apiUrl}/tasks`, newTask);
      setTasks((prev) => [...prev, { ...newTask, id: response.data.id }]);
      setSuccessMessage("Task added successfully!");
      setTask(""); // Clear input after adding task
    } catch (err) {
      setError("Error adding task. Please try again.");
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await axios.put(`${apiUrl}/tasks/${id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
      );
      setSuccessMessage("Task updated successfully!");
      setEditingTaskId(null);
      setEditTaskText("");
    } catch (err) {
      setError("Error updating task. Please try again.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setSuccessMessage("Task deleted successfully!");
    } catch (err) {
      setError("Error deleting task. Please try again.");
    }
  };

  // Memoized paginated tasks
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * tasksPerPage;
    return tasks.slice(start, start + tasksPerPage);
  }, [tasks, currentPage]);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // UseEffect to handle error and success message timeouts
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return (
    <div className="w-full flex items-center justify-center py-6 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Tasks</h3>

        {/* Error and Success Messages */}
        {error && (
          <div className="p-4 mb-4 bg-red-200 text-red-700 rounded-md shadow-sm">
            <strong>Error:</strong> {error}
          </div>
        )}
        {successMessage && (
          <div className="p-4 mb-4 bg-green-200 text-green-700 rounded-md shadow-sm">
            <strong>Success:</strong> {successMessage}
          </div>
        )}

        {/* Add Task Section */}
        <div className="mb-6">
          <textarea
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="w-full py-2 mt-1 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <h4 className="text-2xl font-semibold mb-4 text-gray-800">Task List</h4>
        <ul className="space-y-4">
          {paginatedTasks.map((taskItem) => (
            <li
              key={taskItem.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
                taskItem.completed ? "bg-green-100" : "bg-gray-50"
              }`}
            >
              {editingTaskId === taskItem.id ? (
                <div className="flex space-x-4 w-full">
                  <input
                    type="text"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md w-full"
                  />
                  <button
                    onClick={() => handleUpdateTask(taskItem.id, { task: editTaskText })}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 w-full">
                  <span className={`flex-1 text-lg ${taskItem.completed ? "line-through text-gray-500" : ""}`}>
                    {taskItem.task}
                  </span>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setEditingTaskId(taskItem.id);
                        setEditTaskText(taskItem.task);
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(taskItem.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-16">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-1 rounded-lg text-white ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 rounded-lg text-white ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
