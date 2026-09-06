import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Reports from './components/Reports';
import Settings from './components/Settings';
import InvoiceModal from './components/InvoiceModal';
import { 
  Search, Package, UserCheck, 
  ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight,
  Lock, User, LogIn, Camera
} from 'lucide-react';

// ==========================================
// 1. LOGIN COMPONENT
// ==========================================
function Login({ onLogin }) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const savedUser = localStorage.getItem('mc_admin_username') || 'admin';
    const savedPass = localStorage.getItem('mc_admin_password') || '1234';

    if (usernameInput.trim().toLowerCase() === savedUser.toLowerCase() && passwordInput === savedPass) {
      localStorage.setItem('mc_has_setup', 'true');
      onLogin();
    } else {
      setError('Invalid Username or Password! (Default: admin / 1234)');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white flex items-center justify-center p-4 font-sans">
      <div className="bg-[#14181d] border border-gray-800 p-6 md:p-8 rounded-3xl w-full max-w-md space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-amber-400/10 text-amber-400 rounded-2xl mb-2">
            <Camera size={32} />
          </div>
          <h1 className="text-2xl font-black text-amber-400 tracking-wider">MEMORY CAPTURE</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Studio System Initial Setup</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-400 font-bold mb-1 uppercase text-[10px]">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-gray-500" />
              <input 
                type="text" 
                placeholder="Enter Username" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-[#0d0f12] border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-xl font-bold focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 font-bold mb-1 uppercase text-[10px]">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-gray-500" />
              <input 
                type="password" 
                placeholder="Enter Password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#0d0f12] border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-xl font-bold focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-amber-400 hover:bg-yellow-500 text-black font-black py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <LogIn size={16} /> Continue to Studio System
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-500">
          Default Credentials: <span className="text-amber-400 font-bold">admin</span> / <span className="text-amber-400 font-bold">1234</span>
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 2. PRICE LOOKUP COMPONENT
// ==========================================
function PriceLookup({ isDarkMode }) {
  const [search, setSearch] = useState('');
  const prices = [
    { size: '4x6 Print', price: 'Rs. 800', category: 'Print Only' },
    { size: '5x7 Print', price: 'Rs. 1,200', category: 'Print Only' },
    { size: '8x10 Print', price: 'Rs. 1,800', category: 'Print Only' },
    { size: '10x15 Frame Print', price: 'Rs. 3,900', category: 'Frame Included' },
    { size: '12x18 Frame Print', price: 'Rs. 5,500', category: 'Frame Included' },
    { size: '16x24 Frame Print', price: 'Rs. 8,500', category: 'Frame Included' },
  ];

  const filtered = prices.filter(p => p.size.toLowerCase().includes(search.toLowerCase()));

  const bgCard = isDarkMode ? 'bg-[#14181d] border-gray-800' : 'bg-white border-gray-200 shadow-sm';
  const bgInput = isDarkMode ? 'bg-[#0d0f12] border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900';

  return (
    <div className="space-y-4 text-xs">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PRICING GUIDE</p>
        <h1 className="text-xl font-black text-amber-400 tracking-wider">PRICE LOOKUP</h1>
      </div>

      <div className={`border p-4 md:p-5 rounded-2xl space-y-4 ${bgCard}`}>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search price by size or frame type..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full border rounded-xl pl-10 pr-3 py-2.5 font-bold focus:outline-none focus:border-amber-400 ${bgInput}`} 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between ${bgInput}`}>
              <span className="text-gray-400 font-bold text-[10px] uppercase">{item.category}</span>
              <span className="text-sm font-black my-1">{item.size}</span>
              <span className="text-amber-400 font-black text-base">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. CALENDAR COMPONENT
// ==========================================
function CalendarView({ isDarkMode }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1));
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const bgCard = isDarkMode ? 'bg-[#14181d] border-gray-800' : 'bg-white border-gray-200 shadow-sm';
  const bgInput = isDarkMode ? 'bg-[#0d0f12] border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900';

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SCHEDULE & BOOKINGS</p>
          <h1 className="text-xl font-black text-amber-400 tracking-wider">STUDIO CALENDAR</h1>
        </div>

        <div className={`flex items-center justify-between sm:justify-start gap-3 border p-1.5 rounded-xl ${bgCard}`}>
          <button onClick={handlePrevMonth} className="p-1 hover:opacity-70 rounded-lg cursor-pointer"><ChevronLeft size={18} /></button>
          <span className="font-bold text-xs w-32 text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={handleNextMonth} className="p-1 hover:opacity-70 rounded-lg cursor-pointer"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className={`border p-3 md:p-5 rounded-2xl space-y-4 overflow-x-auto ${bgCard}`}>
        <div className="min-w-[600px]">
          <div className="grid grid-cols-7 gap-2 text-center font-bold text-[10px] uppercase text-gray-400 mb-2">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-20 opacity-20 rounded-xl border border-gray-800"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isToday = dayNum === 24 && currentDate.getMonth() === 8 && currentDate.getFullYear() === 2026;
              
              return (
                <div 
                  key={dayNum} 
                  className={`h-20 p-2 rounded-xl border flex flex-col justify-between transition-all ${
                    isToday ? 'bg-amber-400/10 border-amber-400' : bgInput
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-xs ${isToday ? 'text-amber-400' : ''}`}>{dayNum}</span>
                    {isToday ? <span className="text-[9px] bg-amber-400 text-black px-1 rounded font-black">TODAY</span> : null}
                  </div>

                  {dayNum === 24 ? (
                    <div className="bg-amber-400/20 text-amber-500 text-[9px] font-bold p-1 rounded border border-amber-400/30 truncate">
                      HIRUN - Order Due
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. STOCK IN COMPONENT
// ==========================================
function StockIn({ isDarkMode }) {
  const bgCard = isDarkMode ? 'bg-[#14181d] border-gray-800' : 'bg-white border-gray-200 shadow-sm';
  const bgInput = isDarkMode ? 'bg-[#0d0f12] border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900';

  return (
    <div className="space-y-4 text-xs">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">INVENTORY MANAGEMENT</p>
        <h1 className="text-xl font-black text-amber-400 tracking-wider">STOCK IN (ADD SUPPLIES)</h1>
      </div>

      <div className={`border p-4 md:p-5 rounded-2xl space-y-4 ${bgCard}`}>
        <div className="flex items-center gap-2 text-emerald-500 font-bold border-b pb-3 border-gray-800">
          <ArrowDownRight size={18} /> Record New Material Stock
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Stock Added Successfully!'); }} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-400 block mb-1 uppercase text-[10px]">Material / Item Name</label>
              <input type="text" placeholder="e.g. 10x15 Style 01 Frame Molding" className={`w-full border p-2.5 rounded-xl font-bold ${bgInput}`} required />
            </div>
            <div>
              <label className="font-bold text-gray-400 block mb-1 uppercase text-[10px]">Quantity Added</label>
              <input type="number" placeholder="50" className={`w-full border p-2.5 rounded-xl font-bold ${bgInput}`} required />
            </div>
          </div>
          <button type="submit" className="w-full sm:w-auto bg-amber-400 text-black font-black px-5 py-2.5 rounded-xl cursor-pointer hover:bg-yellow-500 transition-all uppercase tracking-wider">
            Save Stock Entry
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [isSetupDone, setIsSetupDone] = useState(() => {
    return localStorage.getItem('mc_has_setup') !== null ? localStorage.getItem('mc_has_setup') === 'true' : true;
  });

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState(null);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to lock the system? You will need to log in again.')) {
      localStorage.removeItem('mc_has_setup');
      setIsSetupDone(false);
    }
  };

  if (!isSetupDone) {
    return <Login onLogin={() => setIsSetupDone(true)} />;
  }

  const bgMain = isDarkMode ? 'bg-[#0d0f12] text-white' : 'bg-gray-100 text-gray-900';
  const bgCard = isDarkMode ? 'bg-[#14181d] border-gray-800' : 'bg-white border-gray-200 shadow-sm';
  const bgInput = isDarkMode ? 'bg-[#0d0f12] border-gray-800 text-white' : 'bg-gray-50 border-gray-300 text-gray-900';

  return (
    <div className={`flex flex-col md:flex-row min-h-screen font-sans w-full overflow-x-hidden ${bgMain}`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        handleLogout={handleLogout}
      />

      <main className="flex-1 p-3 md:p-6 overflow-y-auto w-full min-w-0">
        {activeTab === 'Dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode} 
            onPrint={(order) => setSelectedOrderForPrint(order)} 
          />
        )}

        {activeTab === 'Orders' && (
          <Orders 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode} 
            onPrint={(order) => setSelectedOrderForPrint(order)} 
          />
        )}

        {activeTab === 'Price Lookup' && <PriceLookup isDarkMode={isDarkMode} />}

        {activeTab === 'Calendar' && <CalendarView isDarkMode={isDarkMode} />}

        {activeTab === 'Stock / Inventory' && (
          <div className="space-y-4 text-xs">
            <h1 className="text-xl font-black text-amber-400 tracking-wider">STOCK / INVENTORY</h1>
            <div className={`border p-4 md:p-5 rounded-xl space-y-3 ${bgCard}`}>
              <div className="flex items-center gap-2 font-bold"><Package size={18} className="text-amber-400" /> Frame Material Inventory</div>
              <div className="space-y-2">
                <div className={`p-3 rounded-lg border flex justify-between items-center ${bgInput}`}><span>10x15 Style 01 Frame Molding</span><span className="text-red-500 font-bold">2 Units Remaining</span></div>
                <div className={`p-3 rounded-lg border flex justify-between items-center ${bgInput}`}><span>12x18 Style 02 Frame Molding</span><span className="text-amber-500 font-bold">5 Units Remaining</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Stock In' && <StockIn isDarkMode={isDarkMode} />}

        {activeTab === 'Stock Out' && (
          <div className="space-y-4 text-xs">
            <h1 className="text-xl font-black text-amber-400 tracking-wider">STOCK OUT (DISPATCHED)</h1>
            <div className={`border p-4 md:p-5 rounded-xl space-y-3 ${bgCard}`}>
              <div className="flex items-center gap-2 text-red-500 font-bold"><ArrowUpRight size={18} /> Record Material Usage</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Item Name" className={`border p-2.5 rounded-lg ${bgInput}`} />
                <input type="number" placeholder="Quantity Used" className={`border p-2.5 rounded-lg ${bgInput}`} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Customers' && (
          <div className="space-y-4 text-xs">
            <h1 className="text-xl font-black text-amber-400 tracking-wider">CUSTOMER DIRECTORY</h1>
            <div className={`border p-4 md:p-5 rounded-xl space-y-3 ${bgCard}`}>
              <div className="flex items-center gap-2 font-bold"><UserCheck size={18} className="text-amber-400" /> Registered Clients</div>
              <div className={`p-3 rounded-lg border flex justify-between items-center ${bgInput}`}><div><p className="font-bold">Hirun</p><p className="text-[10px] text-gray-400">0781149719</p></div><span className="text-amber-500 font-bold">1 Active Order</span></div>
            </div>
          </div>
        )}

        {activeTab === 'Reports' && <Reports isDarkMode={isDarkMode} />}

        {activeTab === 'Settings' && (
          <Settings 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode} 
            handleLogout={handleLogout}
          />
        )}
      </main>

      {/* Invoice Modal for Printing */}
      {selectedOrderForPrint && (
        <InvoiceModal 
          order={selectedOrderForPrint} 
          onClose={() => setSelectedOrderForPrint(null)} 
        />
      )}
    </div>
  );
}