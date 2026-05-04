import { useState } from "react";

const TaskInput = ({ addTask, inputRef, user, goToLogin }) => {
  const [text, setText] = useState("");

  const handleKeyDown = (e) => {
    if (!user) {
      goToLogin();
      return;
    }

    if (e.key === "Enter" && text.trim()) {
      addTask(text);
      setText("");
    }
  };

  return (
    <div className="mb-10">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={user ? "What needs to be done?" : "Login to add tasks"}
        className="input"
      />
    </div>
  );
};

export default TaskInput; // 🔥 THIS LINE IS REQUIRED