import React, { useState } from "react";
import uuid from "react-uuid";

const TodoApp = () => {
  const initialTask = [
    {
      id: 1,
      value: "Read Book",
      completed: false,
    },
    {
      id: 2,
      value: "30 min workout",
      completed: false,
    },
    {
      id: 3,
      value: "Answer Email",
      completed: true,
    },
    {
      id: 4,
      value: "Learn English Grammar",
      completed: true,
    },
  ];
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(initialTask);
  const [message, setMessage] = useState("");

  const handleSubmitTask = (e) => {
    e.preventDefault();
    setTaskList([...taskList, { id: uuid(), value: task, completed: false }]);
    setTask("");
    showMessage("Task Added Successfully.");
  };

  const handleDeleteTask = (id) => {
    const remainTask = taskList?.filter((task) => task?.id !== id);
    setTaskList(remainTask);
    showMessage("Task Deleted Successfully.");
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleCompletedTask = (id) => {
    const updatedTaskList = taskList?.map((task) =>
      task?.id === id ? { ...task, completed: true } : task
    );
    setTaskList(updatedTaskList);
  };

  return (
    <div className="todo-container">
      <p className={`alert-box ${message ? "active" : ""}`}>{message}</p>
      <h2 className="header">TO DO APP</h2>
      <form className="todo-form" onSubmit={handleSubmitTask}>
        <label htmlFor="addTask">Add Task</label>
        <input
          name="task"
          id="addTask"
          className="add-task-field"
          value={task}
          onChange={(e) => setTask(e?.target?.value)}
        />
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
      <div className="task-list-container">
        <h3 className="task-list-header">Task Lists</h3>
        <div className="task-list">
          {taskList?.map((task) => (
            <div
              className={`task-item ${task?.completed ? "completed-task" : ""}`}
              key={task?.id}
            >
              <p className="task-name">{task?.value}</p>
              <div className="task-item-btn">
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => handleDeleteTask(task?.id)}
                >
                  Delete
                </button>
                {!task?.completed && (
                  <button
                    type="button"
                    className="btn text-btn"
                    onClick={() => handleCompletedTask(task?.id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
