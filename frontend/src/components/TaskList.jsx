import { useState } from "react";

const formatDate = (date) => {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// 🔥 Priority color helper
const getPriorityColor = (priority) => {
  if (priority === "high") return "bg-red-500";
  if (priority === "medium") return "bg-yellow-400";
  return "bg-green-500";
};

const TaskList = ({
  tasks,
  toggleTask,
  deleteTask,
  updateTask,
  view,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // EMPTY STATE
  if (
    !tasks ||
    (Array.isArray(tasks) && tasks.length === 0)
  ) {
    return (
      <p className="text-gray-400 text-sm">
        No tasks yet. Add one 👆
      </p>
    );
  }

  // 🔥 PROJECT VIEW (GROUPED)
  if (view === "projects") {
    return (
      <div className="space-y-8">
        {Object.entries(tasks).map(
          ([project, projectTasks]) => (
            <div key={project}>
              <h3 className="text-sm font-medium mb-3 text-gray-600">
                {project}
              </h3>

              <div className="space-y-3">
                {projectTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center"
                  >
                    <div
                      onClick={() => toggleTask(task)}
                      className="flex gap-3 items-center cursor-pointer"
                    >
                      {/* Priority dot */}
                      <div
                        className={`w-2 h-2 rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      />

                      {/* Checkbox */}
                      <div
                        className={`w-4 h-4 border rounded-full ${
                          task.completed ? "bg-black" : ""
                        }`}
                      />

                      {/* Edit UI */}
                      {editingId === task.id ? (
                        <input
                          value={editText}
                          onChange={(e) =>
                            setEditText(e.target.value)
                          }
                          autoFocus
                          className="border-b outline-none text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateTask(task.id, editText);
                              setEditingId(null);
                            }
                            if (e.key === "Escape") {
                              setEditingId(null);
                            }
                          }}
                          onBlur={() => setEditingId(null)}
                        />
                      ) : (
                        <span
                          onDoubleClick={() => {
                            setEditingId(task.id);
                            setEditText(task.text);
                          }}
                          className={
                            task.completed
                              ? "line-through text-gray-400"
                              : ""
                          }
                        >
                          {task.text}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {task.due_date && (
                        <span>{formatDate(task.due_date)}</span>
                      )}

                      <button
                        onClick={() => deleteTask(task.id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  // 🔥 NORMAL VIEW (TODAY / UPCOMING)
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center"
        >
          <div
            onClick={() => toggleTask(task)}
            className="flex gap-3 items-center cursor-pointer"
          >
            {/* Priority dot */}
            <div
              className={`w-2 h-2 rounded-full ${getPriorityColor(
                task.priority
              )}`}
            />

            {/* Checkbox */}
            <div
              className={`w-4 h-4 border rounded-full ${
                task.completed ? "bg-black" : ""
              }`}
            />

            {/* Edit UI */}
            {editingId === task.id ? (
              <input
                value={editText}
                onChange={(e) =>
                  setEditText(e.target.value)
                }
                autoFocus
                className="border-b outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTask(task.id, editText);
                    setEditingId(null);
                  }
                  if (e.key === "Escape") {
                    setEditingId(null);
                  }
                }}
                onBlur={() => setEditingId(null)}
              />
            ) : (
              <span
                onDoubleClick={() => {
                  setEditingId(task.id);
                  setEditText(task.text);
                }}
                className={
                  task.completed
                    ? "line-through text-gray-400"
                    : ""
                }
              >
                {task.text}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            {task.due_date && (
              <span>{formatDate(task.due_date)}</span>
            )}

            <button onClick={() => deleteTask(task.id)}>
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;