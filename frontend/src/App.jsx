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
import Cursor from "./components/Cursor";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState("home");
  const [view, setView] = useState("today");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const inputRef = useRef(null);

  // 🔐 AUTH
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

  // 📥 FETCH TASKS
  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setToast({ type: "error", message: error.message });
        setLoading(false);
        return;
      }

      setTasks(data || []);
      setLoading(false);
    };

    fetchTasks();
  }, [user]);

  // ➕ ADD TASK
  const addTask = async (
    text,
    dueDate = null,
    project = null,
    priority = "medium"
  ) => {
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
          priority,
        },
      ])
      .select();

    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    setTasks((prev) => [data[0], ...prev]);
  };

  // ✏️ UPDATE TASK
  const updateTask = async (id, newText) => {
    if (!newText.trim()) return;

    const { data, error } = await supabase
      .from("tasks")
      .update({ text: newText })
      .eq("id", id)
      .select();

    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? data[0] : t))
    );
  };

  // ❌ DELETE
  const deleteTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 🔄 TOGGLE
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

  // 🚪 LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setToast({ type: "info", message: "Logged out" });
  };

  // 📊 FILTER
  const todayDate = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks.filter((task) => {
    if (view === "today") return task.due_date === todayDate;
    if (view === "upcoming")
      return task.due_date && task.due_date > todayDate;
    if (view === "projects") return task.project;
    return true;
  });

  const groupedTasks = tasks.reduce((acc, task) => {
    const key = task.project?.trim() || "No Project";
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  // 🎯 UI
  return (
    <div className="page">
      <Cursor />

      {page === "home" && (
        <Home goToApp={() => setPage("app")} goToLogin={() => setPage("auth")} />
      )}

      {page === "auth" && (
        <Auth setUser={setUser} setToast={setToast} setPage={setPage} />
      )}

      {page === "app" && (
        <>
          <SocialLinks />

          {/* 📱 MOBILE NAVBAR */}
          <div className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-[#DDD6C0]/90 backdrop-blur-md shadow-sm">

  {/* MENU */}
  <button
    onClick={() => setIsSidebarOpen(true)}
    className="text-xl"
  >
    ☰
  </button>

  {/* CENTER TITLE */}
  <h1 className="text-base font-medium absolute left-1/2 -translate-x-1/2">
    Tickd
  </h1>

  {/* RIGHT SPACER */}
  <div className="w-6" />

</div>

          {/* 🔥 OVERLAY */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {toast && (
            <div className="fixed top-5 right-5 z-50">
              <Toast {...toast} onClose={() => setToast(null)} />
            </div>
          )}

          <div className="flex w-full max-w-6xl gap-6">
            <Sidebar
              focusInput={() => inputRef.current?.focus()}
              user={user}
              logout={logout}
              goToLogin={() => setPage("auth")}
              setView={setView}
              view={view}
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
            />

            <div className="flex-1 bg-[#f7f3ed] rounded-2xl px-4 md:px-12 py-6 md:py-12 shadow-sm">
              {view === "analysis" ? (
                <Analysis tasks={tasks} />
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 capitalize">
                    {view}
                  </h1>

                  <TaskInput
                    addTask={addTask}
                    inputRef={inputRef}
                    user={user}
                    goToLogin={() => setPage("auth")}
                  />

                  {loading ? (
                    <p className="text-gray-400 text-sm">Loading tasks...</p>
                  ) : (
                    <TaskList
                      tasks={view === "projects" ? groupedTasks : filteredTasks}
                      view={view}
                      toggleTask={toggleTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;