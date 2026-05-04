const formatDate = (date) => {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const TaskList = ({ tasks, toggleTask, deleteTask, view }) => {

  // 🔥 PROJECT VIEW (GROUPED)
  if (view === "projects") {
    return (
      <div className="space-y-8">

        {Object.entries(tasks).map(([project, projectTasks]) => (
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
                    className="flex gap-3 cursor-pointer"
                  >
                    <div className={`w-4 h-4 border rounded-full ${
                      task.completed ? "bg-black" : ""
                    }`} />

                    <span className={task.completed ? "line-through text-gray-400" : ""}>
                      {task.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {task.due_date && <span>{formatDate(task.due_date)}</span>}

                    <button onClick={() => deleteTask(task.id)}>
                      delete
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    );
  }

  // 🔥 NORMAL VIEW (TODAY / UPCOMING)
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center">

          <div
            onClick={() => toggleTask(task)}
            className="flex gap-3 cursor-pointer"
          >
            <div className={`w-4 h-4 border rounded-full ${
              task.completed ? "bg-black" : ""
            }`} />

            <span className={task.completed ? "line-through text-gray-400" : ""}>
              {task.text}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            {task.due_date && <span>{formatDate(task.due_date)}</span>}

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