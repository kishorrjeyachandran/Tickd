import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  // ✅ Prevent rendering when message is empty
  if (!message) return null;

  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]); // ✅ depend on message

  const styles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    info: "bg-gray-200 text-gray-700",
  };

  return (
    <div className={`px-4 py-2 rounded ${styles[type]}`}>
      {message}
    </div>
  );
};

export default Toast;