import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, CheckCircle, Clock, Calendar } from 'lucide-react';

export default function Reports() {
  const [orders, setOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('2026-09');

  useEffect(() => {
    const saved = localStorage.getItem('mc_orders');
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  // Total Summary Calcs
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  
  // Approximate Revenue Calculation (Rs. 3900 per frame as baseline)
  const totalRevenue = totalOrders * 3900;

  return (
    <div className="space-y-5 text-xs text-gray-300">
      <div className="flex justify-between items-center pb-2">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ANALYTICS</p>
          <h1 className="text-xl font-black text-amber-400 tracking-wider">MONTHLY REPORTS</h1>
        </div>

        {/* Month Picker Filter */}
        <div className="flex items-center gap-2 bg-[#14181d] border border-gray-800 px-3 py-1.5 rounded-lg text-gray-300">
          <Calendar size={14} className="text-amber-400" />
          <input 
            type="month" 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent text-white font-bold focus:outline-none"
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#14181d] border border-gray-800 p-4 rounded-xl">
          <p className="text-[10px] text-gray-400 uppercase font-bold">ESTIMATED REVENUE</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">Rs. {totalRevenue.toLocaleString()}</h3>
          <p className="text-[9px] text-gray-500 mt-1 flex items-center gap-1">
            <TrendingUp size={10} className="text-emerald-400" /> Monthly Growth
          </p>
        </div>

        <div className="bg-[#14181d] border border-gray-800 p-4 rounded-xl">
          <p className="text-[10px] text-gray-400 uppercase font-bold">TOTAL MONTHLY ORDERS</p>
          <h3 className="text-2xl font-black text-white mt-1">{totalOrders}</h3>
          <p className="text-[9px] text-gray-500 mt-1">All processed items</p>
        </div>

        <div className="bg-[#14181d] border border-gray-800 p-4 rounded-xl">
          <p className="text-[10px] text-gray-400 uppercase font-bold">COMPLETED ORDERS</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">{completedOrders}</h3>
          <p className="text-[9px] text-gray-500 mt-1 flex items-center gap-1">
            <CheckCircle size={10} className="text-emerald-400" /> Delivered to clients
          </p>
        </div>

        <div className="bg-[#14181d] border border-gray-800 p-4 rounded-xl">
          <p className="text-[10px] text-gray-400 uppercase font-bold">PENDING ORDERS</p>
          <h3 className="text-2xl font-black text-amber-400 mt-1">{pendingOrders}</h3>
          <p className="text-[9px] text-gray-500 mt-1 flex items-center gap-1">
            <Clock size={10} className="text-amber-400" /> In production line
          </p>
        </div>
      </div>

      {/* Sales Detailed Breakdown */}
      <div className="bg-[#14181d] border border-gray-800 p-5 rounded-xl space-y-4">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <BarChart3 size={16} /> MONTHLY SUMMARY BREAKDOWN
        </h3>

        <div className="space-y-3">
          <div className="bg-[#0d0f12] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-xs">Standard Frame Prints (10x15)</p>
              <p className="text-[10px] text-gray-500">Most ordered size for September</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-amber-400">Rs. 11,700</span>
              <p className="text-[10px] text-gray-500">3 Orders</p>
            </div>
          </div>

          <div className="bg-[#0d0f12] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-bold text-white text-xs">Album & Event Shoots</p>
              <p className="text-[10px] text-gray-500">Weddings & Preshoots</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-400">Completed</span>
              <p className="text-[10px] text-gray-500">2 Packages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}