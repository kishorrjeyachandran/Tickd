import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Toast from "./components/Toast";
import SocialLinks from "./components/SocialLinks";
function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState("home");
  const inputRef = useRef(null);

  // session check
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (user && !user.email_confirmed_at) {
        await supabase.auth.signOut();
        return;
      }

      setUser(user || null);
    };

    checkUser();
  }, []);

  // fetch tasks ONLY if logged in
  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setTasks(data);
    };

    fetchTasks();
  }, [user]);

  const addTask = async (text) => {
    if (!user) return;

    const { data } = await supabase
      .from("tasks")
      .insert([{ text, completed: false, user_id: user.id }])
      .select();

    if (data) setTasks([data[0], ...tasks]);
  };

  const deleteTask = async (id) => {
    if (!user) return;

    await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = async (task) => {
    if (!user) return;

    const { data } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id)
      .select();

    if (data) {
      setTasks(tasks.map((t) => (t.id === task.id ? data[0] : t)));
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setToast({ type: "info", message: "Logged out" });
  };

  // routing
  if (page === "home") {
    return <Home goToApp={() => setPage("app")} />;
  }

  if (page === "auth") {
    return <Auth setUser={setUser} setToast={setToast} />;
  }

  return (
    <div className="page">
      
      {toast && (
        <div className="fixed top-5 right-5 z-50">
          <Toast {...toast} onClose={() => setToast(null)} />
        </div>
      )}

      <div className="container">
        <Sidebar
          focusInput={() => inputRef.current?.focus()}
          user={user}
          logout={logout}
          goToLogin={() => setPage("auth")}
        />

        <div className="card">
          <h1 className="text-3xl font-semibold mb-10">Today</h1>

          <TaskInput
            addTask={addTask}
            inputRef={inputRef}
            user={user}
            goToLogin={() => setPage("auth")}
          />

          <TaskList
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;