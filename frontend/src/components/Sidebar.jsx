import { Home, Calendar, Folder, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = ({ focusInput, user, logout, goToLogin, setView }) => {
  return (
    <div className="w-64 pt-6 flex flex-col justify-between bg-[#DDD6C0] rounded-2xl px-6 py-6">

      <div>

        <motion.img
          src="/logo.png"
          alt="logo"
          className="w-8 h-8 object-contain cursor-pointer mb-2"
          whileHover={{ scale: 1.15, rotate: -6 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        <h2 className="text-xl font-medium mb-6">Tickd</h2>

        <button
          onClick={focusInput}
          className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded-lg mb-8"
        >
          <Plus size={16} /> Add Task
        </button>

        <div className="space-y-5 text-sm">

          <div onClick={() => setView("today")} className="nav-item cursor-pointer">
            <Home size={18}/> Today
          </div>

          <div onClick={() => setView("upcoming")} className="nav-item cursor-pointer">
            <Calendar size={18}/> Upcoming
          </div>

          <div onClick={() => setView("projects")} className="nav-item cursor-pointer">
            <Folder size={18}/> Projects
          </div>

        </div>
      </div>

      {!user ? (
        <button
          onClick={goToLogin}
          className="text-sm border px-4 py-2 rounded-lg"
        >
          Login
        </button>
      ) : (
        <div className="flex items-center gap-3 mt-10 pt-6 border-t border-black/10">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
            {user.email[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm">{user.email}</p>
            <button onClick={logout} className="text-xs text-gray-500">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;