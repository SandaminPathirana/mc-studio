import React, { useState, useEffect } from 'react';
import { getStock, updateStockQuantity, saveStockItem } from '../utils/storage';
import { Box, AlertTriangle, Plus, Search, X, ArrowDownRight } from 'lucide-react';

export default function StockIn() {
  const [stockList, setStockList] = useState([]);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Item States
  const [size, setSize] = useState('10x15');
  const [style, setStyle] = useState('STYLE 01');
  const [color, setColor] = useState('Black');
  const [quantity, setQuantity] = useState(10);
  const [minStock, setMinStock] = useState(3);

  useEffect(() => {
    setStockList(getStock());
  }, []);

  const handleQtyChange = (id, currentQty, amount) => {
    const updated = updateStockQuantity(id, currentQty + amount);
    setStockList(updated);
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const newItem = {
      id: 'STK-' + Math.floor(100 + Math.random() * 900),
      size,
      style,
      color,
      quantity: Number(quantity),
      minStock: Number(minStock)
    };

    const updated = saveStockItem(newItem);
    setStockList(updated);
    setIsAddModalOpen(false);
    alert('New Stock Item Added Successfully!');
  };

  const filteredStock = stockList.filter(item => 
    item.size.toLowerCase().includes(search.toLowerCase()) ||
    item.style.toLowerCase().includes(search.toLowerCase()) ||
    item.color.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = stockList.filter(item => item.quantity <= item.minStock).length;

  return (
    <div className="space-y-5 text-textMain">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-textMain tracking-wide uppercase flex items-center gap-2">
            <ArrowDownRight className="text-emerald-400" size={22} /> INVENTORY & STOCK IN
          </h2>
          <p className="text-xs text-textMuted">Manage available frame items, update quantities & add new stocks</p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-accentGold hover:bg-yellow-500 text-black font-extrabold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 uppercase cursor-pointer"
        >
          <Plus size={16} /> ADD NEW STOCK
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-bgCard border border-gray-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><Box size={22} /></div>
          <div>
            <p className="text-[11px] font-bold text-textMuted uppercase">TOTAL STOCK TYPES</p>
            <h3 className="text-2xl font-black">{stockList.length}</h3>
          </div>
        </div>

        <div className="bg-red-950/30 border border-red-800/60 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-red-500/20 text-red-500 rounded-xl"><AlertTriangle size={22} /></div>
          <div>
            <p className="text-[11px] font-bold text-red-400 uppercase">LOW STOCK ALERTS</p>
            <h3 className="text-2xl font-black text-red-500">{lowStockCount}</h3>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-3 text-textMuted" />
        <input 
          type="text"
          placeholder="Search by Frame Size, Style, or Color..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-bgCard border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-textMain focus:border-accentGold outline-none"
        />
      </div>

      <div className="bg-bgCard border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bgMain text-textMuted uppercase font-bold border-b border-gray-800">
              <tr>
                <th className="p-3.5">Stock ID</th>
                <th className="p-3.5">Frame Size</th>
                <th className="p-3.5">Style</th>
                <th className="p-3.5">Color</th>
                <th className="p-3.5">Available Qty</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 text-textMain">
              {filteredStock.map((item) => {
                const isLow = item.quantity <= item.minStock;
                return (
                  <tr key={item.id} className="hover:bg-bgMain/40 transition-colors">
                    <td className="p-3.5 font-bold text-accentGold">{item.id}</td>
                    <td className="p-3.5 font-bold">{item.size}</td>
                    <td className="p-3.5 text-textMuted">{item.style}</td>
                    <td className="p-3.5">{item.color}</td>
                    <td className="p-3.5 font-extrabold text-sm">{item.quantity}</td>
                    <td className="p-3.5">
                      {isLow ? (
                        <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                          <AlertTriangle size={12} /> LOW STOCK
                        </span>
                      ) : (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full w-max">
                          IN STOCK
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex justify-center items-center gap-1">
                        <button 
                          onClick={() => handleQtyChange(item.id, item.quantity, -1)}
                          className="w-7 h-7 bg-bgMain border border-gray-800 rounded text-red-400 font-bold hover:bg-red-950/40"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => handleQtyChange(item.id, item.quantity, 1)}
                          className="w-7 h-7 bg-bgMain border border-gray-800 rounded text-emerald-400 font-bold hover:bg-emerald-950/40"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD STOCK MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-bgCard border border-gray-800 p-6 rounded-2xl w-full max-w-md space-y-4 relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-textMuted hover:text-textMain"
            >
              <X size={18} />
            </button>

            <h3 className="text-sm font-bold text-accentGold border-b border-gray-800 pb-2 uppercase tracking-wider">
              ADD NEW STOCK ITEM
            </h3>

            <form onSubmit={handleAddStock} className="space-y-3">
              <div>
                <label className="text-[11px] text-textMuted font-bold block mb-1 uppercase">Frame Size</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-bgMain border border-gray-800 rounded-lg p-2.5 text-xs text-textMain outline-none"
                >
                  {['4x6', '5x7', '6x8', '8x10', '8x12', '10x12', '10x15', '12x15', '12x18', '16x24', '20x30', '24x36'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-textMuted font-bold block mb-1 uppercase">Style</label>
                  <select 
                    value={style} 
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full bg-bgMain border border-gray-800 rounded-lg p-2.5 text-xs text-textMain outline-none"
                  >
                    <option value="STYLE 01">STYLE 01</option>
                    <option value="STYLE 02">STYLE 02</option>
                    <option value="STYLE 03">STYLE 03</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-textMuted font-bold block mb-1 uppercase">Color</label>
                  <select 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-bgMain border border-gray-800 rounded-lg p-2.5 text-xs text-textMain outline-none"
                  >
                    {['Black', 'White', 'Brown', 'Gold', 'Wood'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-textMuted font-bold block mb-1 uppercase">Quantity</label>
                  <input 
                    type="number" 
                    required 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-bgMain border border-gray-800 rounded-lg p-2.5 text-xs text-textMain outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-textMuted font-bold block mb-1 uppercase">Min Alert Stock</label>
                  <input 
                    type="number" 
                    required 
                    value={minStock}
                    onChange={(e) => setMinStock(e.target.value)}
                    className="w-full bg-bgMain border border-gray-800 rounded-lg p-2.5 text-xs text-textMain outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-gray-800 text-textMuted text-xs py-2.5 rounded-lg font-bold hover:bg-gray-700"
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-accentGold text-black text-xs py-2.5 rounded-lg font-bold hover:bg-yellow-500"
                >
                  ADD TO STOCK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}