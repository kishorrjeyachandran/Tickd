import { useState } from "react";

const TaskInput = ({ addTask }) => {
  const [text, setText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text.trim()) {
      addTask(text);
      setText("");
    }
  };

  return (
    <div className="mb-10">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input"
      />
    </div>
  );
};

export default TaskInput;