import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Toast from "./components/Toast";
import SocialLinks from "./components/SocialLinks";
import Analysis from "./components/Analysis";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState("home");
  const [view, setView] = useState("today");
  const inputRef = useRef(null);

  // AUTH
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) setPage("app");
        else setPage("home");
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // FETCH TASKS
  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setToast({ type: "error", message: error.message });
        return;
      }

      setTasks(data || []);
    };

    fetchTasks();
  }, [user]);

  // ADD TASK
  const addTask = async (text, dueDate = null, project = null) => {
    if (!user || !text.trim()) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          text,
          completed: false,
          user_id: user.id,
          due_date: dueDate,
          project: project?.trim() || null,
        },
      ])
      .select();

    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    setTasks((prev) => [data[0], ...prev]);
  };

  // DELETE
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // TOGGLE
  const toggleTask = async (task) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id)
      .select();

    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? data[0] : t))
    );
  };

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setToast({ type: "info", message: "Logged out" });
  };

  // FILTER LOGIC
  const todayDate = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks.filter((task) => {
    if (view === "today") return task.due_date === todayDate;
    if (view === "upcoming")
      return task.due_date && task.due_date > todayDate;
    if (view === "projects") return task.project;
    return true;
  });

  const groupedTasks = tasks.reduce((acc, task) => {
    const projectName = task.project?.trim();
    const key = projectName ? projectName : "No Project";

    if (!acc[key]) acc[key] = [];
    acc[key].push(task);

    return acc;
  }, {});

  // ROUTING
  if (page === "home") {
    return <Home goToApp={() => setPage("app")} goToLogin={() => setPage("auth")} />;
  }

  if (page === "auth") {
    return <Auth setUser={setUser} setToast={setToast} setPage={setPage} />;
  }

  return (
    <div className="page">
      <SocialLinks />

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
          setView={setView}
          view={view}
        />

        <div className="card">
          {view === "analysis" ? (
            <Analysis tasks={tasks} />
          ) : (
            <>
              <h1 className="text-3xl font-semibold mb-10 capitalize">
                {view}
              </h1>

              <TaskInput
                addTask={addTask}
                inputRef={inputRef}
                user={user}
                goToLogin={() => setPage("auth")}
              />

              <TaskList
                tasks={view === "projects" ? groupedTasks : filteredTasks}
                view={view}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;