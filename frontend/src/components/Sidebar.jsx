import { Home, Calendar, Folder, Plus } from "lucide-react";

const Sidebar = ({ focusInput }) => {
  return (
    <div className="w-64 pt-6 flex flex-col justify-between">

      {/* TOP */}
      <div>
        <h2 className="text-xl font-medium mb-6">Tickd</h2>

        {/* ADD TASK BUTTON */}
        <button
          onClick={focusInput}
          className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded-lg mb-8 hover:opacity-90 transition"
        >
          <Plus size={16} /> Add Task
        </button>

        {/* NAVIGATION */}
        <div className="space-y-5 text-sm">
          <div className="nav-item">
            <Home size={18} /> Today
          </div>

          <div className="nav-item">
            <Calendar size={18} /> Upcoming
          </div>

          <div className="nav-item">
            <Folder size={18} /> Projects
          </div>
        </div>
      </div>

      {/* PROFILE */}
      <div className="flex items-center gap-3 mt-10 pt-6 border-t border-black/10">
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
          K
        </div>
        <div>
          <p className="text-sm font-medium">Kishor</p>
          <p className="text-xs text-gray-500">Developer</p>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;