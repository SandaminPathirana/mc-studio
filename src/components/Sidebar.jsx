import React from 'react';
import { 
  LayoutDashboard, ShoppingBag, Calendar as CalendarIcon, Tag, 
  Package, ArrowDownRight, ArrowUpRight, Users, BarChart3, Settings as SettingsIcon, LogOut 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isDarkMode, handleLogout }) {
  // Sidebar items list
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Orders', icon: ShoppingBag },
    { name: 'Price Lookup', icon: Tag },
    { name: 'Calendar', icon: CalendarIcon },
    { name: 'Stock / Inventory', icon: Package },
    { name: 'Stock In', icon: ArrowDownRight },
    { name: 'Stock Out', icon: ArrowUpRight },
    { name: 'Customers', icon: Users },
    { name: 'Reports', icon: BarChart3 },
    { name: 'Settings', icon: SettingsIcon },
  ];

  const sidebarBg = isDarkMode ? 'bg-[#0D0D0D] border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900';

  return (
    <aside className={`w-64 border-r min-h-screen p-4 flex flex-col justify-between transition-colors duration-200 ${sidebarBg}`}>
      <div className="space-y-6">
        {/* LOGO */}
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h1 className="font-black text-amber-400 tracking-wider text-base">MC STUDIO</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Admin Panel</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)} // <--- Tab එක Click කළාම මාරු වෙන කොටස
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/10 font-black' 
                    : isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-800/50 hover:text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-black' : 'text-amber-400'} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* LOGOUT BUTTON */}
      {handleLogout && (
        <div className="pt-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
}