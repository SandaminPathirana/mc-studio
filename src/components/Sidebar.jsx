import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Calendar as CalendarIcon, Tag, 
  Package, ArrowDownRight, ArrowUpRight, Users, BarChart3, Settings as SettingsIcon, LogOut,
  Menu, X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isDarkMode, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* MOBILE TOP BAR */}
      <div className={`md:hidden flex items-center justify-between p-4 border-b sticky top-0 z-40 transition-colors duration-200 ${sidebarBg}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h1 className="font-black text-amber-400 tracking-wider text-base leading-none">MC STUDIO</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Toggle Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-xl border transition-all ${
            isDarkMode ? 'bg-gray-800/60 border-gray-700 text-gray-200' : 'bg-gray-100 border-gray-300 text-gray-800'
          }`}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE BACKDROP OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* RESPONSIVE SIDEBAR CONTAINER */}
      <aside className={`
        fixed md:static top-0 left-0 z-50 h-full md:h-auto w-64 border-r min-h-screen p-4 flex flex-col justify-between transition-all duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${sidebarBg}
      `}>
        <div className="space-y-6">
          {/* DESKTOP LOGO */}
          <div className="hidden md:flex items-center gap-3 px-2">
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
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsOpen(false);
                  }}
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
          <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}