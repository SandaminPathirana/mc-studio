import React, { useState } from 'react';
import { X, Calendar, User, Phone, DollarSign, Package } from 'lucide-react';
import { saveOrder } from '../utils/storage';

export default function NewOrderModal({ isOpen, onClose, onOrderAdded }) {
  const [formData, setFormData] = useState({
    client: '',
    phone: '',
    package: 'Wedding Photography',
    date: '',
    amount: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderObj = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      ...formData,
      status: 'Confirmed'
    };

    saveOrder(newOrderObj);
    if (onOrderAdded) onOrderAdded();
    onClose();
    setFormData({ client: '', phone: '', package: 'Wedding Photography', date: '', amount: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-bgCard border border-gray-800 w-full max-w-lg rounded-xl shadow-2xl p-6 space-y-5">
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-textMain">Create New Order / Booking</h3>
          <button onClick={onClose} className="text-textMuted hover:text-textMain p-1 rounded-lg bg-gray-800/50">
            <X size={18} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs text-textMuted block mb-1">Customer Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
              <input 
                type="text" 
                required
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                placeholder="Enter client name" 
                className="w-full bg-bgMain border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-accentGold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-textMuted block mb-1">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type="text" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="077XXXXXXX" 
                  className="w-full bg-bgMain border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-accentGold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-textMuted block mb-1">Package / Service</label>
              <div className="relative">
                <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <select 
                  value={formData.package}
                  onChange={(e) => setFormData({...formData, package: e.target.value})}
                  className="w-full bg-bgMain border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-accentGold"
                >
                  <option>Wedding Photography</option>
                  <option>Pre-Wedding Shoot</option>
                  <option>Album Printing</option>
                  <option>Studio Portrait</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-textMuted block mb-1">Event Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-bgMain border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-accentGold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-textMuted block mb-1">Total Amount (LKR)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type="text" 
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="150,000" 
                  className="w-full bg-bgMain border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-accentGold"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-semibold bg-gray-800 text-textMuted">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-accentGold text-black">
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}