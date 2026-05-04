const Message = ({ type = "info", text }) => {
  const styles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    info: "bg-gray-200 text-gray-700",
  };

  return (
    <div className={`p-3 rounded-lg text-sm mb-4 ${styles[type]}`}>
      {text}
    </div>
  );
};

export default Message;