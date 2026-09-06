import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, MessageSquare } from 'lucide-react';

export default function Orders() {
  const [ordersList, setOrdersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadOrders = () => {
    const saved = localStorage.getItem('mc_orders');
    if (saved) {
      setOrdersList(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener('orderPlaced', loadOrders);
    return () => window.removeEventListener('orderPlaced', loadOrders);
  }, []);

  // Digital Invoice WhatsApp Message Function
  const sendWhatsAppBill = (ord) => {
    let phone = ord.phone ? ord.phone.toString().trim().replace(/[^0-9]/g, '') : '';

    if (!phone) {
      alert('Customer phone number is missing!');
      return;
    }

    if (phone.startsWith('0')) {
      phone = '94' + phone.substring(1);
    }

    const total = Number(ord.totalAmount || ord.total || ord.price || 0);
    const advance = Number(ord.advance || 0);
    const balance = total - advance;

    const billMessage = `📸 *MC STUDIO*
*DIGITAL INVOICE RECEIPT*

👤 *Customer:* ${ord.customer || 'N/A'}
🆔 *Order ID:* ${ord.id}
🖼️ *Item / Frame:* ${ord.item || ord.frameSize || 'N/A'}

💰 *Total Amount:* Rs. ${total.toLocaleString()}
✅ *Advance Paid:* Rs. ${advance.toLocaleString()}
🔻 *Balance Due:* Rs. ${balance.toLocaleString()}

📍 *Please show this message when collecting your order.*
📞 *Tel: 078 114 9719*
🙏 *Thank you for choosing MC STUDIO*`;

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(billMessage)}`;
    window.open(waUrl, '_blank');
  };

  const filteredOrders = ordersList.filter(o => 
    (o.id && o.id.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (o.customer && o.customer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="text-amber-400" size={22} />
            Orders Management
          </h1>
          <p className="text-xs text-gray-400">View and manage all customer studio orders</p>
        </div>
      </div>

      <div className="bg-[#14181d] border border-gray-800 rounded-xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center bg-[#0d0f12] border border-gray-800 rounded-lg px-3 py-2 text-xs w-full max-w-sm">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-800 text-gray-400 uppercase font-semibold">
              <tr>
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer Name</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Item / Description</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Due Date</th>
                <th className="pb-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-3.5 font-bold text-amber-400">{ord.id}</td>
                    <td className="py-3.5 text-white font-medium">{ord.customer}</td>
                    <td className="py-3.5 text-gray-400">{ord.phone || 'N/A'}</td>
                    <td className="py-3.5 text-gray-200">{ord.item}</td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                        ord.status === 'Pending' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-gray-400">{ord.date}</td>
                    <td className="py-3.5 text-center">
                      <button 
                        onClick={() => sendWhatsAppBill(ord)}
                        className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-all flex items-center gap-1.5 mx-auto cursor-pointer"
                        title="Send WhatsApp Bill"
                      >
                        <MessageSquare size={14} />
                        <span>WA Bill</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}