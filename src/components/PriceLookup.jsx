import React, { useState } from 'react';
import { Search, Tag, CheckCircle2 } from 'lucide-react';

export default function PriceLookup() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Event', 'Printing'];

  const services = [
    { id: 1, name: 'Full Wedding Coverage', category: 'Wedding', price: 'LKR 250,000', features: ['2 Photographers', '1 Videographer', 'Preserved Album (12x24)', 'Thank You Cards (100)'] },
    { id: 2, name: 'Pre-Wedding Shoot Standard', category: 'Pre-Wedding', price: 'LKR 85,000', features: ['4 Hours Location Shoot', '20 Edited Soft Copies', '16x24 Framed Print'] },
    { id: 3, name: 'Birthday / Event Package', category: 'Event', price: 'LKR 45,000', features: ['3 Hours Coverage', 'All Soft Copies (Edited)', 'Web Gallery'] },
    { id: 4, name: 'Flush Mount Album (12x18)', category: 'Printing', price: 'LKR 35,000', features: ['20 Pages / 10 Spreads', 'Leather Cover', 'UV Coated Sheet'] },
    { id: 5, name: 'Preserved Album Premium', category: 'Printing', price: 'LKR 55,000', features: ['30 Pages High Gloss', 'Wooden Box Pack', 'Lifetime Warranty'] },
    { id: 6, name: 'Cinematic Drone Coverage', category: 'Wedding', price: 'LKR 40,000', features: ['4K Video Footages', '3 Flights', 'Licensed Music Editing'] },
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-bgCard border border-gray-800 p-4 rounded-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
          <input
            type="text"
            placeholder="Search package or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bgMain border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-accentGold"
          />
        </div>

        {/* Category Filter Badges */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-accentGold text-black font-semibold'
                  : 'bg-bgMain text-textMuted hover:text-textMain border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((item) => (
          <div key={item.id} className="bg-bgCard border border-gray-800 rounded-xl p-5 flex flex-col justify-between hover:border-gray-700 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-800 text-accentGold border border-gray-700 flex items-center gap-1">
                  <Tag size={12} />
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-textMain mb-1">{item.name}</h3>
              <p className="text-xl font-extrabold text-accentGold my-3">{item.price}</p>
              
              <ul className="space-y-2 border-t border-gray-800/80 pt-3 text-xs text-textMuted">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-5 w-full bg-gray-800 hover:bg-accentGold hover:text-black text-textMain text-xs font-semibold py-2 rounded-lg transition-colors border border-gray-700">
              Select Package
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}