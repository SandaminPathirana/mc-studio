import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, MapPin, ShoppingBag } from 'lucide-react';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 'CUST-101', name: 'Kasun Kalhara', phone: '0771234567', email: 'kasun@gmail.com', address: 'Colombo 03', totalOrders: 3, totalSpent: 'LKR 210,000' },
    { id: 'CUST-102', name: 'Nimal Perera', phone: '0719876543', email: 'nimal@yahoo.com', address: 'Kandy', totalOrders: 1, totalSpent: 'LKR 25,000' },
    { id: 'CUST-103', name: 'Dilini Fernando', phone: '0755554433', email: 'dilini.f@gmail.com', address: 'Negombo', totalOrders: 2, totalSpent: 'LKR 110,000' },
    { id: 'CUST-104', name: 'Saman Kumara', phone: '0783332211', email: 'saman.k@hotmail.com', address: 'Galle', totalOrders: 4, totalSpent: 'LKR 320,000' },
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-textMain">Customer Directory</h2>
          <p className="text-xs text-textMuted">Manage client profiles and booking history</p>
        </div>
        <button className="flex items-center gap-2 bg-accentGold hover:bg-yellow-500 text-black font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors">
          <UserPlus size={16} />
          <span>Add New Customer</span>
        </button>
      </div>

      <div className="bg-bgCard border border-gray-800 p-4 rounded-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
          <input
            type="text"
            placeholder="Search by name, phone, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bgMain border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-accentGold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredCustomers.map((cust) => (
          <div key={cust.id} className="bg-bgCard border border-gray-800 rounded-xl p-5 flex flex-col justify-between hover:border-gray-700 transition-colors">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-accentGold bg-gray-800 px-2 py-0.5 rounded border border-gray-700">{cust.id}</span>
                  <h3 className="text-lg font-bold text-textMain mt-1">{cust.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-textMuted block">Total Spent</span>
                  <span className="text-sm font-bold text-accentGold">{cust.totalSpent}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-textMuted border-t border-gray-800 pt-3">
                <div className="flex items-center gap-2"><Phone size={13} className="text-accentGold" /> <span>{cust.phone}</span></div>
                <div className="flex items-center gap-2"><Mail size={13} className="text-accentGold" /> <span>{cust.email}</span></div>
                <div className="flex items-center gap-2"><MapPin size={13} className="text-accentGold" /> <span>{cust.address}</span></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-textMuted">
                <ShoppingBag size={14} className="text-accentGold" />
                <span>{cust.totalOrders} Orders Completed</span>
              </span>
              <button className="text-accentGold hover:underline font-medium">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}