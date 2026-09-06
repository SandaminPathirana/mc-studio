import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
import { getInventory } from '../utils/storage';

export default function Header({ title }) {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const checkStock = () => {
    try {
      const inventory = getInventory() || [];
      const lowStockItems = inventory.filter(
        (item) => Number(item.quantity ?? 0) <= 5
      );
      setNotifications(lowStockItems);
    } catch (error) {
      console.error("Notification Sync Error:", error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    checkStock();
    const interval = setInterval(checkStock, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800 relative z-30">
      <h1 className="text-2xl font-bold text-textMain">{title || 'Dashboard'}</h1>

      <div className="relative">
        <button 
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative p-2.5 rounded-lg bg-bgCard border border-gray-800 text-textMuted hover:text-textMain hover:border-gray-700 transition-all cursor-pointer flex items-center justify-center"
        >
          <Bell size={20} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {notifications.length}
            </span>
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-80 bg-bgCard border border-gray-800 rounded-xl shadow-2xl p-4 z-50">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-800">
              <h3 className="text-sm font-semibold text-textMain">Low Stock Alerts</h3>
              <span className="text-xs text-accentGold font-bold px-2 py-0.5 bg-accentGold/10 rounded">
                {notifications.length} Items
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <p className="text-xs text-textMuted text-center py-6">
                  No low stock warnings. All items are sufficiently stocked!
                </p>
              ) : (
                notifications.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs">
                    <AlertTriangle size={16} className="text-red-400 shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-200">{item.name || 'Stock Item'}</p>
                      <p className="text-textMuted mt-0.5">
                        Stock Remaining: <span className="text-red-400 font-bold">{item.quantity ?? 0}</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}