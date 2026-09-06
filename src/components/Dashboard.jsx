import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, Package, AlertTriangle, Plus, Calendar as CalendarIcon, X, ArrowRight, CheckCircle2, User, Phone, DollarSign } from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const [selectedSize, setSelectedSize] = useState('10x15');
  const [selectedStyle, setSelectedStyle] = useState('STYLE 01');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [printOption, setPrintOption] = useState('Studio Print');
  const [orders, setOrders] = useState([]);
  
  // Pending Orders Modal State
  const [showPendingModal, setShowPendingModal] = useState(false);

  // New Notification Banner State
  const [notification, setNotification] = useState(null);

  // New Customer Details Modal State
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAdvance, setCustAdvance] = useState('');
  const [custDueDate, setCustDueDate] = useState('');

  // Fixed prices for breakdown (Customize as needed)
  const framePrice = 2500;
  const printPrice = 1400;
  const totalPrice = framePrice + printPrice;

  // LocalStorage එකෙන් Data Load කිරීම
  const loadOrders = () => {
    const saved = localStorage.getItem('mc_orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    } else {
      const initial = [
        { id: 'ORD-30381', customer: 'hirun', phone: '0781149719', item: '10x15 (STYLE 01)', status: 'Pending', date: '2026-09-24', advance: 1000, price: 3900 },
        { id: 'ORD-1001', customer: 'Kasun Kalhara', phone: 'N/A', item: 'Wedding Photography', status: 'Completed', date: 'N/A', advance: 0, price: 3900 },
        { id: 'ORD-1002', customer: 'Nimali Perera', phone: 'N/A', item: 'Preshoot Album', status: 'Completed', date: 'N/A', advance: 0, price: 3900 }
      ];
      setOrders(initial);
      localStorage.setItem('mc_orders', JSON.stringify(initial));
    }
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener('orderPlaced', loadOrders);
    return () => window.removeEventListener('orderPlaced', loadOrders);
  }, []);

  // PLACE ORDER ක්ලික් කළ විට Modal එක Open කිරීම
  const handleOpenCustomerModal = () => {
    setShowCustomerModal(true);
  };

  // Modal එකෙන් Form එක Submit කළ පසු Order එක Save වන Function එක
  const handleFinalOrderSubmit = (e) => {
    e.preventDefault();

    const newOrdId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrdId,
      customer: custName,
      phone: custPhone,
      item: `${selectedSize} (${selectedStyle} - ${selectedColor})`,
      status: 'Pending',
      date: custDueDate || new Date().toISOString().split('T')[0],
      advance: Number(custAdvance) || 0,
      price: totalPrice
    };

    const existing = JSON.parse(localStorage.getItem('mc_orders')) || [];
    const updated = [newOrder, ...existing];
    localStorage.setItem('mc_orders', JSON.stringify(updated));
    
    window.dispatchEvent(new Event('orderPlaced'));

    // Success Notification එක පෙන්වීම
    setNotification({
      id: newOrdId,
      message: `Order ${newOrdId} placed for ${custName} successfully!`
    });

    // Form inputs Reset කර Modal එක Close කිරීම
    setCustName('');
    setCustPhone('');
    setCustAdvance('');
    setCustDueDate('');
    setShowCustomerModal(false);

    // තත්පර 5කට පසු notification එක නැති වීම
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Orders Tab එකට Navigate වන Function එක
  const handleGoToOrders = () => {
    setShowPendingModal(false);
    setNotification(null);
    if (setActiveTab) {
      setActiveTab('Orders');
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'Pending');

  return (
    <div className="space-y-5 text-xs text-gray-300 relative">

      {/* 0. CLICKABLE SUCCESS NOTIFICATION BANNER */}
      {notification && (
        <div 
          onClick={handleGoToOrders}
          className="fixed top-5 right-5 z-50 bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-4 rounded-xl shadow-2xl flex items-center gap-3 cursor-pointer hover:bg-emerald-500/30 transition-all animate-bounce"
        >
          <CheckCircle2 size={20} className="text-emerald-400" />
          <div>
            <p className="font-bold text-xs text-white">Order Success!</p>
            <p className="text-[11px] text-emerald-300">{notification.message}</p>
          </div>
          <ArrowRight size={16} className="ml-2 text-emerald-400" />
        </div>
      )}
      
      {/* 1. TOP HEADER */}
      <div className="flex justify-between items-center pb-2">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">WELCOME BACK</p>
          <h1 className="text-xl font-black text-amber-400 tracking-wider">MC STUDIO</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#14181d] border border-gray-800 px-3 py-1.5 rounded-lg text-gray-300 text-[11px]">
            <CalendarIcon size={14} className="text-gray-400" />
            <span>04 Sep 2026</span>
          </div>

          <div className="flex items-center gap-2 bg-[#14181d] border border-gray-800 px-3 py-1.5 rounded-lg text-gray-300 text-[11px]">
            <Clock size={14} className="text-gray-400" />
            <span>10:44:28 PM</span>
          </div>

          <button 
            onClick={() => setShowPendingModal(true)}
            className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 px-3 py-1.5 rounded-lg text-amber-400 text-[11px] font-bold cursor-pointer transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>{pendingOrders.length} Pending Orders</span>
          </button>
        </div>
      </div>

      {/* 2. TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#14181d] border border-gray-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">TOTAL ORDERS</p>
            <h3 className="text-2xl font-black text-white mt-1">{orders.length}</h3>
          </div>
          <div className="p-3 bg-amber-400/10 text-amber-400 rounded-lg"><ShoppingBag size={20} /></div>
        </div>

        <div 
          onClick={() => setShowPendingModal(true)}
          className="bg-[#14181d] border border-gray-800 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-amber-400/40 transition-all"
        >
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">PENDING</p>
            <h3 className="text-2xl font-black text-amber-400 mt-1">{pendingOrders.length}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg"><Clock size={20} /></div>
        </div>

        <div className="bg-[#14181d] border border-gray-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">TOTAL STOCK ITEMS</p>
            <h3 className="text-2xl font-black text-white mt-1">128</h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg"><Package size={20} /></div>
        </div>

        <div className="bg-[#14181d] border border-gray-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">LOW STOCK ITEMS</p>
            <h3 className="text-2xl font-black text-red-500 mt-1">7</h3>
          </div>
          <div className="p-3 bg-red-500/10 text-red-400 rounded-lg"><AlertTriangle size={20} /></div>
        </div>
      </div>

      {/* 3. CONFIGURATOR & BREAKDOWN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-[#14181d] border border-gray-800 p-5 rounded-xl space-y-4">
          <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            ◆ PRICE LOOKUP & CONFIGURATOR
          </h2>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">SELECT PRINT OPTION</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: 'Studio Print', sub: 'Studio Photo' },
                { name: 'CD Print (Hot)', sub: 'Customer File' },
                { name: 'CD Print (Cool)', sub: 'Customer File' },
                { name: 'Frame Only', sub: 'No Printing' }
              ].map((opt) => (
                <button 
                  key={opt.name}
                  onClick={() => setPrintOption(opt.name)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    printOption === opt.name 
                      ? 'bg-amber-400/10 border-amber-400 text-amber-400' 
                      : 'bg-[#0d0f12] border-gray-800 text-gray-400'
                  }`}
                >
                  <p className="font-bold text-[11px]">{opt.name}</p>
                  <p className="text-[9px] opacity-60">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">1. SELECT SIZE</label>
            <div className="grid grid-cols-6 gap-2">
              {['4x6', '5x7', '6x8', '8x10', '8x12', '10x12', '10x15', '12x15', '12x18', '16x24', '20x30', '24x36'].map((sz) => (
                <button 
                  key={sz} 
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    selectedSize === sz 
                      ? 'bg-amber-400 text-black border-amber-400' 
                      : 'bg-[#0d0f12] border-gray-800 text-gray-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">2. SELECT STYLE</label>
            <div className="grid grid-cols-3 gap-2">
              {['STYLE 01', 'STYLE 02', 'STYLE 03'].map((st) => (
                <button 
                  key={st} 
                  onClick={() => setSelectedStyle(st)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    selectedStyle === st 
                      ? 'bg-amber-400/10 border-amber-400 text-amber-400' 
                      : 'bg-[#0d0f12] border-gray-800 text-gray-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">3. SELECT COLOR</label>
            <div className="flex gap-2">
              {['Black', 'White', 'Brown', 'Gold', 'Wood'].map((cl) => (
                <button 
                  key={cl} 
                  onClick={() => setSelectedColor(cl)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                    selectedColor === cl 
                      ? 'bg-amber-400/10 border-amber-400 text-amber-400' 
                      : 'bg-[#0d0f12] border-gray-800 text-gray-300'
                  }`}
                >
                  {cl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#14181d] border border-gray-800 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">SELECTION & PRICE BREAKDOWN</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-300"><span>Size:</span><span className="font-bold text-white">{selectedSize}</span></div>
              <div className="flex justify-between text-gray-300"><span>Frame Price ({selectedStyle}):</span><span className="font-bold text-white">Rs. {framePrice.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-300"><span>Print Type:</span><span className="font-bold text-white uppercase">{printOption}</span></div>
              <div className="flex justify-between text-emerald-400"><span>Print Price:</span><span className="font-bold">+ Rs. {printPrice.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-800/50 mt-6">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase font-bold">TOTAL PRICE</p>
              <h2 className="text-3xl font-black text-amber-400">Rs. {totalPrice.toLocaleString()}</h2>
              <p className="text-[9px] text-gray-500">Frame + Print Combined Price</p>
            </div>
            <button 
              onClick={handleOpenCustomerModal}
              className="w-full bg-amber-400 hover:bg-yellow-500 text-black font-black text-xs py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-400/10"
            >
              <Plus size={16} /> PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      {/* 4. RECENT ORDERS & STOCK OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#14181d] border border-gray-800 p-5 rounded-xl space-y-3">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">RECENT ORDERS ({orders.length})</h3>
          <div className="space-y-2">
            {orders.slice(0, 3).map((ord) => (
              <div 
                key={ord.id} 
                onClick={handleGoToOrders}
                className="bg-[#0d0f12] hover:bg-[#181d24] p-3 rounded-lg border border-gray-800/80 flex justify-between items-center cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{ord.customer}</span>
                    <span className="text-[10px] text-amber-400 font-mono">({ord.id})</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{ord.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-300">{ord.item}</p>
                  <p className={`text-[10px] font-bold ${ord.status === 'Pending' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {ord.status} - Due: {ord.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#14181d] border border-gray-800 p-5 rounded-xl space-y-3">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">STOCK OVERVIEW</h3>
          <div className="space-y-2">
            <div className="bg-[#0d0f12] p-3 rounded-lg border border-gray-800/80 flex justify-between items-center">
              <span className="font-bold text-gray-200">10x15 | Style 01 | Black</span>
              <span className="text-xs font-bold text-red-400">Stock: 2 <span className="text-[10px] text-gray-500">Min: 3</span></span>
            </div>
            <div className="bg-[#0d0f12] p-3 rounded-lg border border-gray-800/80 flex justify-between items-center">
              <span className="font-bold text-gray-200">12x18 | Style 02 | Brown</span>
              <span className="text-xs font-bold text-red-400">Stock: 1 <span className="text-[10px] text-gray-500">Min: 3</span></span>
            </div>
            <div className="bg-[#0d0f12] p-3 rounded-lg border border-gray-800/80 flex justify-between items-center">
              <span className="font-bold text-gray-200">16x24 | Style 01 | White</span>
              <span className="text-xs font-bold text-amber-400">Stock: 3 <span className="text-[10px] text-gray-500">Min: 3</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CUSTOMER DETAILS POPUP MODAL */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#14181d] border border-gray-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">CUSTOMER & ORDER DETAILS</h3>
              <button 
                onClick={() => setShowCustomerModal(false)}
                className="p-1 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFinalOrderSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Customer Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-2.5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="e.g. Kasun Kalhara" 
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full bg-[#0d0f12] border border-gray-800 pl-9 pr-3 py-2 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Phone Number</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-2.5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="e.g. 0771234567" 
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full bg-[#0d0f12] border border-gray-800 pl-9 pr-3 py-2 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Advance Paid (Rs.)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500 font-bold text-xs">Rs.</span>
                    <input 
                      type="number" 
                      placeholder="1000" 
                      value={custAdvance}
                      onChange={(e) => setCustAdvance(e.target.value)}
                      className="w-full bg-[#0d0f12] border border-gray-800 pl-9 pr-3 py-2 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Due Date</label>
                  <div className="relative">
                    <CalendarIcon size={15} className="absolute left-3 top-2.5 text-gray-500" />
                    <input 
                      type="date" 
                      value={custDueDate}
                      onChange={(e) => setCustDueDate(e.target.value)}
                      className="w-full bg-[#0d0f12] border border-gray-800 pl-9 pr-3 py-2 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0d0f12] p-3 rounded-xl border border-gray-800 text-[11px] font-bold space-y-1">
                <div className="flex justify-between text-gray-400"><span>Total Order Amount:</span> <span className="text-white">Rs. {totalPrice}</span></div>
                <div className="flex justify-between text-red-400">
                  <span>Balance Due:</span> 
                  <span>Rs. {totalPrice - (Number(custAdvance) || 0)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-amber-400 hover:bg-yellow-500 text-black font-black py-2.5 rounded-xl transition-all cursor-pointer uppercase tracking-wider text-xs mt-2"
              >
                Confirm & Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. PENDING ORDERS MODAL POPUP */}
      {showPendingModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#14181d] border border-gray-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="text-amber-400" size={18} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pending Orders List ({pendingOrders.length})</h3>
              </div>
              <button 
                onClick={() => setShowPendingModal(false)}
                className="p-1 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[350px] overflow-y-auto space-y-2 pr-1">
              {pendingOrders.length > 0 ? (
                pendingOrders.map((ord) => (
                  <div 
                    key={ord.id} 
                    onClick={handleGoToOrders}
                    className="bg-[#0d0f12] hover:bg-[#181d24] border border-gray-800/80 hover:border-amber-400/50 p-3.5 rounded-xl flex justify-between items-center cursor-pointer transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs group-hover:text-amber-400 transition-colors">{ord.customer}</span>
                        <span className="text-[10px] font-mono text-amber-400">{ord.id}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Contact: {ord.phone}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-300">{ord.item}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded text-[9px] font-bold">
                          Pending - Due: {ord.date}
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500 text-xs">
                  No pending orders at the moment.
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setShowPendingModal(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}