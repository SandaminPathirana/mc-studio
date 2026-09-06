import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Plus } from 'lucide-react';
import { getOrders } from '../utils/storage';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [orders, setOrders] = useState([]);

  // Load orders from LocalStorage
  useEffect(() => {
    const loadedOrders = getOrders();
    setOrders(loadedOrders);
  }, []);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDayIndex }, (_, i) => i);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-textMain">Studio Schedule & Calendar</h2>
          <p className="text-xs text-textMuted">Track upcoming shoots, bookings, and studio events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar View */}
        <div className="lg:col-span-2 bg-bgCard border border-gray-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-accentGold" size={20} />
              <h3 className="text-lg font-bold text-textMain">{monthNames[month]} {year}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-lg bg-bgMain border border-gray-800 text-textMuted hover:text-textMain hover:border-accentGold transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-lg bg-bgMain border border-gray-800 text-textMuted hover:text-textMain hover:border-accentGold transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-xs font-bold text-textMuted py-2">{d}</div>
            ))}

            {paddingDays.map((_, i) => (
              <div key={`pad-${i}`} className="h-16 rounded-lg bg-bgMain/30 border border-transparent"></div>
            ))}

            {daysArray.map((day) => {
              const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const hasBooking = orders.find(o => o.date === formattedDate);

              return (
                <div 
                  key={day} 
                  className={`h-16 rounded-lg border p-1.5 flex flex-col justify-between transition-colors ${
                    hasBooking 
                      ? 'bg-accentGold/10 border-accentGold' 
                      : 'bg-bgMain border-gray-800/80 hover:border-gray-700'
                  }`}
                >
                  <span className={`text-xs font-bold ${hasBooking ? 'text-accentGold' : 'text-textMain'}`}>
                    {day}
                  </span>
                  {hasBooking && (
                    <span className="text-[9px] truncate font-medium bg-accentGold text-black px-1 py-0.5 rounded">
                      {hasBooking.client.split(' ')[0]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Month Events List */}
        <div className="bg-bgCard border border-gray-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-textMain border-b border-gray-800 pb-3">
            Events for {monthNames[month]}
          </h3>

          <div className="space-y-3">
            {orders.filter(o => o.date && o.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).length === 0 ? (
              <p className="text-xs text-textMuted py-4 text-center">No bookings scheduled for this month.</p>
            ) : (
              orders
                .filter(o => o.date && o.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`))
                .map((ord, idx) => (
                  <div key={idx} className="bg-bgMain border border-gray-800 rounded-lg p-3 space-y-2 hover:border-gray-700 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-textMain">{ord.client}</h4>
                      <span className="text-[10px] font-bold bg-gray-800 text-accentGold px-2 py-0.5 rounded border border-gray-700">
                        {ord.package}
                      </span>
                    </div>
                    <div className="space-y-1 text-[11px] text-textMuted">
                      <div className="flex items-center gap-1.5"><Clock size={12} className="text-accentGold" /> <span>{ord.date}</span></div>
                      <div className="flex items-center gap-1.5"><MapPin size={12} className="text-accentGold" /> <span>{ord.phone}</span></div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}