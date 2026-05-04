import { useState } from "react";

const TaskInput = ({ addTask, inputRef }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("medium");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text.trim()) {
      addTask(text, dueDate || null, project || null, priority);
      setText("");
      setDueDate("");
      setPriority("medium");
      setProject("");
    }
  };

  return (
    <div className="mb-10 space-y-3">

      <input
        ref={inputRef}
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input"
      />

      <div className="flex gap-3 text-sm">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <input
          type="text"
          placeholder="Project (optional)"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="border px-2 py-1 rounded text-sm"
>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
      </div>
      
    </div>
  );
};

export default TaskInput;