import { Home, Calendar, Folder } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 pt-6">
      <h2 className="text-xl font-medium mb-10">Tickd</h2>

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
  );
};

export default Sidebar;