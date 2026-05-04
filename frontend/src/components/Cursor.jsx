import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
  style={{
    position: "fixed",
    left: position.x,
    top: position.y,
    width: "18px",
    height: "18px",
    backgroundColor: "#C9C1A6",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",

    zIndex: 9999, // 🔥 VERY IMPORTANT

    boxShadow: "0 0 15px rgba(120,110,80,0.9)",
  }}
/>
  );
};

export default Cursor;