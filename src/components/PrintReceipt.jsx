import React from 'react';
import { Printer, X } from 'lucide-react';

export default function PrintReceipt({ order, onClose, isDarkMode }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const modalBg = isDarkMode ? 'bg-[#14181d] text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md border rounded-2xl p-6 shadow-2xl relative ${modalBg}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-800 transition-colors no-print cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Printable Content Area */}
        <div id="printable-receipt" className="space-y-4 text-xs">
          <div className="text-center border-b pb-4 border-dashed border-gray-600">
            <h2 className="text-lg font-black tracking-widest text-amber-400">MC STUDIO</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Studio Management System</p>
            <p className="text-[10px] text-gray-400 mt-1">Tel: +94 78 114 9719</p>
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono">
            <div>
              <p><span className="text-gray-400">RECEIPT NO:</span> <strong className="text-amber-400">{order.id || 'ORD-1001'}</strong></p>
              <p><span className="text-gray-400">CLIENT:</span> {order.customerName || 'Walk-in Customer'}</p>
            </div>
            <div className="text-right">
              <p><span className="text-gray-400">DATE:</span> {new Date().toLocaleDateString()}</p>
              <p><span className="text-gray-400">TIME:</span> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>

          <div className="border-t border-b border-dashed border-gray-600 py-3 space-y-2">
            <div className="flex justify-between font-bold">
              <span>Item / Description</span>
              <span>Amount</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>{order.item || '10x15 Frame Print (Style 01)'}</span>
              <span>Rs. {order.amount ? order.amount.toLocaleString() : '3,900'}</span>
            </div>
          </div>

          <div className="space-y-1 text-right text-[11px]">
            <div className="flex justify-between font-black text-sm text-amber-400 pt-1">
              <span>TOTAL AMOUNT:</span>
              <span>Rs. {order.amount ? order.amount.toLocaleString() : '3,900'}</span>
            </div>
            <p className="text-[10px] text-emerald-400 font-bold">Status: Paid / Advance Received</p>
          </div>

          <div className="text-center border-t border-dashed border-gray-600 pt-4 space-y-1">
            <p className="font-bold text-[10px]">Thank you for your business!</p>
            <p className="text-[9px] text-gray-500">Please keep this receipt for order collection.</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end gap-2 no-print">
          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-yellow-500 text-black font-black py-2.5 rounded-xl transition-all cursor-pointer uppercase tracking-wider text-xs"
          >
            <Printer size={16} /> Print Receipt
          </button>
        </div>

      </div>
    </div>
  );
}