import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function PriceLookup({ isDarkMode }) {
  const [search, setSearch] = useState('');
  const [prices, setPrices] = useState([]);

  // Load saved prices from LocalStorage (managed via Settings) or defaults
  useEffect(() => {
    const savedPrices = localStorage.getItem('mc_custom_prices');
    if (savedPrices) {
      try {
        setPrices(JSON.parse(savedPrices));
      } catch (e) {
        setPrices(getDefaultPrices());
      }
    } else {
      setPrices(getDefaultPrices());
    }
  }, []);

  const getDefaultPrices = () => [
    { size: '4x6 Print', price: 'Rs. 800', category: 'Print Only' },
    { size: '5x7 Print', price: 'Rs. 1,200', category: 'Print Only' },
    { size: '8x10 Print', price: 'Rs. 1,800', category: 'Print Only' },
    { size: '10x15 Frame Print', price: 'Rs. 3,900', category: 'Frame Included' },
    { size: '12x18 Frame Print', price: 'Rs. 5,500', category: 'Frame Included' },
    { size: '16x24 Frame Print', price: 'Rs. 8,500', category: 'Frame Included' },
  ];

  const filtered = prices.filter(p => 
    p.size.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

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
            placeholder="Search price by size, print or frame type..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full border rounded-xl pl-10 pr-3 py-2.5 font-bold focus:outline-none focus:border-amber-400 ${bgInput}`} 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between ${bgInput}`}>
              <span className={`text-[10px] font-bold uppercase ${item.category === 'Print Only' ? 'text-blue-400' : 'text-amber-400'}`}>
                {item.category}
              </span>
              <span className="text-sm font-black my-1">{item.size}</span>
              <span className="text-emerald-400 font-black text-base">{item.price}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-400 text-center col-span-full py-4">No pricing found. Add prices in Settings.</p>
          )}
        </div>
      </div>
    </div>
  );
}