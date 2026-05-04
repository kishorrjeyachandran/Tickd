import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    info: "bg-gray-200 text-gray-700",
  };

  return (
    <div className={`px-4 py-3 rounded-lg shadow text-sm ${styles[type]}`}>
      {message}
    </div>
  );
};

export default Toast;