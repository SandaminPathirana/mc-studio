import React, { useState, useEffect } from 'react';
import { Search, Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import { getInventory } from '../utils/storage';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const data = getInventory();
    setItems(data || []);
  }, []);

  const categories = ['All', 'Equipment', 'Albums', 'Frames', 'Printing Paper'];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase()) ||
                          item.id?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs text-textMuted">Manage studio equipment, materials, and stock levels</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accentGold text-bgMain font-semibold rounded-lg hover:bg-yellow-500 transition-colors text-sm">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-bgCard p-4 rounded-xl border border-gray-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-textMuted" size={18} />
          <input
            type="text"
            placeholder="Search stock by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bgMain border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-accentGold"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-accentGold text-bgMain font-bold'
                  : 'bg-bgMain text-textMuted hover:text-textMain border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bgCard rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bgMain/50 text-textMuted uppercase border-b border-gray-800">
              <tr>
                <th className="p-4">Item ID</th>
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Est. Unit Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredItems.map((item) => {
                const qty = Number(item.quantity || 0);
                const isLowStock = qty <= 5;

                return (
                  <tr key={item.id} className="hover:bg-bgMain/30 transition-colors">
                    <td className="p-4 font-bold text-accentGold">{item.id}</td>
                    <td className="p-4 font-medium text-textMain">{item.name}</td>
                    <td className="p-4 text-textMuted">{item.category}</td>
                    <td className={`p-4 font-bold ${isLowStock ? 'text-red-400' : 'text-textMain'}`}>
                      {qty}
                    </td>
                    <td className="p-4 text-textMuted">LKR {Number(item.price || 0).toLocaleString()}</td>
                    <td className="p-4">
                      {isLowStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                          <AlertTriangle size={12} /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                          <CheckCircle size={12} /> In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}