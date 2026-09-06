import React, { useState, useEffect } from 'react';
import { Moon, Sun, Lock, LogOut, ShieldCheck, KeyRound, CheckCircle, User } from 'lucide-react';

export default function Settings({ isDarkMode, setIsDarkMode, handleLogout }) {
  // Username & Password States
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  // Initial username load from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('mc_admin_username') || 'Admin';
    setUsername(savedUser);
  }, []);

  const handleAccountUpdate = (e) => {
    e.preventDefault();

    // Validate Password if filled
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match!' });
        return;
      }
      if (newPassword.length < 4) {
        setMessage({ type: 'error', text: 'Password must be at least 4 characters!' });
        return;
      }
      localStorage.setItem('mc_admin_password', newPassword);
    }

    // Save Username
    localStorage.setItem('mc_admin_username', username);
    setMessage({ type: 'success', text: 'Account settings updated successfully!' });

    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const bgCard = isDarkMode ? 'bg-[#14181d] border-gray-800' : 'bg-white border-gray-200 shadow-sm';
  const bgInput = isDarkMode ? 'bg-[#0d0f12] border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900';
  const textSub = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="space-y-6 text-xs max-w-3xl">
      <div>
        <p className={`text-[10px] font-bold uppercase tracking-wider ${textSub}`}>PREFERENCES</p>
        <h1 className="text-xl font-black text-amber-400 tracking-wider">SYSTEM SETTINGS</h1>
      </div>

      {/* 1. THEME PREFERENCE */}
      <div className={`border p-5 rounded-2xl space-y-4 ${bgCard}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl">
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <div>
              <h2 className="font-bold text-sm">Appearance Theme</h2>
              <p className={`text-[11px] ${textSub}`}>Switch between Dark and Light background modes</p>
            </div>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-amber-400 text-black hover:bg-yellow-500' 
                : 'bg-gray-800 text-white hover:bg-gray-900'
            }`}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>

      {/* 2. USERNAME & SECURITY SETTINGS */}
      <div className={`border p-5 rounded-2xl space-y-4 ${bgCard}`}>
        <div className="flex items-center gap-2 text-amber-400 font-bold border-b pb-3 border-gray-800 text-sm">
          <Lock size={18} /> Admin Profile & Security Settings
        </div>

        {message && (
          <div className={`p-3 rounded-xl border flex items-center gap-2 font-bold ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            <CheckCircle size={16} /> {message.text}
          </div>
        )}

        <form onSubmit={handleAccountUpdate} className="space-y-3">
          {/* USERNAME FIELD */}
          <div>
            <label className={`font-bold block mb-1 uppercase text-[10px] ${textSub}`}>Admin Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Enter Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-bold focus:outline-none focus:border-amber-400 ${bgInput}`}
                required
              />
            </div>
          </div>

          <hr className="border-gray-800/60 my-2" />

          {/* PASSWORD FIELDS */}
          <div>
            <label className={`font-bold block mb-1 uppercase text-[10px] ${textSub}`}>Current Password</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-bold focus:outline-none focus:border-amber-400 ${bgInput}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`font-bold block mb-1 uppercase text-[10px] ${textSub}`}>New Password</label>
              <input 
                type="password" 
                placeholder="Leave blank to keep same" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full p-2.5 rounded-xl border font-bold focus:outline-none focus:border-amber-400 ${bgInput}`}
              />
            </div>

            <div>
              <label className={`font-bold block mb-1 uppercase text-[10px] ${textSub}`}>Confirm New Password</label>
              <input 
                type="password" 
                placeholder="Leave blank to keep same" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2.5 rounded-xl border font-bold focus:outline-none focus:border-amber-400 ${bgInput}`}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="bg-amber-400 hover:bg-yellow-500 text-black font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
          >
            Save Account Settings
          </button>
        </form>
      </div>

      {/* 3. LOGOUT SESSION */}
      <div className={`border p-5 rounded-2xl space-y-3 ${bgCard}`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-sm text-red-400 flex items-center gap-2">
              <ShieldCheck size={18} /> Admin Session Management
            </h2>
            <p className={`text-[11px] ${textSub}`}>Log out of the current studio session safely</p>
          </div>

          <button 
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2"
          >
            <LogOut size={16} /> Logout Account
          </button>
        </div>
      </div>

    </div>
  );
}