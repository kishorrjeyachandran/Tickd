import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="page">
      <div className="container">
        <Sidebar />

        <div className="card">
          <h1 className="text-3xl font-semibold mb-10 tracking-tight">
            Today
          </h1>

          <TaskInput addTask={addTask} />

          <div className="flex gap-6 mb-8">
            <button onClick={() => setFilter("all")} className="filter-btn">
              All
            </button>
            <button onClick={() => setFilter("active")} className="filter-btn">
              Active
            </button>
            <button onClick={() => setFilter("completed")} className="filter-btn">
              Completed
            </button>
          </div>

          <TaskList
            tasks={filteredTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;