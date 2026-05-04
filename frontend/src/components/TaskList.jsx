const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <div className="space-y-5">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center group"
        >
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => toggleTask(task.id)}
          >
            <div
              className={`w-4 h-4 rounded-full border ${
                task.completed
                  ? "bg-black border-black"
                  : "border-black/30"
              }`}
            />

            <span
              className={`text-sm ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
          </div>

          <button
            onClick={() => deleteTask(task.id)}
            className="text-xs opacity-0 group-hover:opacity-100 transition"
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;