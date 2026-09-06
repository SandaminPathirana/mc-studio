import React from 'react';
import { Printer, X, Camera } from 'lucide-react';

export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const advance = Number(order.advance || 0);
  const total = Number(order.totalAmount || order.price || 0);
  const balance = total - advance;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-black w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Action Bar (Hidden during printing) */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Order Invoice Receipt</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="bg-amber-400 text-black px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-yellow-400 transition-all cursor-pointer"
            >
              <Printer size={16} /> Print / Save PDF
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PRINTABLE RECEIPT CONTENT */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs font-sans print:p-0 print:text-black" id="printable-invoice">
          
          {/* Header */}
          <div className="text-center border-b pb-4 border-gray-300 space-y-1">
            <div className="inline-flex items-center gap-2 text-amber-500 font-black text-lg uppercase tracking-widest">
              <Camera size={22} className="text-black print:text-black" /> MC STUDIO
            </div>
            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-wider">Studio & Digital Frame Works</p>
            <p className="text-[10px] text-gray-500">Tel: 078 114 9719 | MC STUDIO </p>
          </div>

          {/* Invoice Info */}
          <div className="flex justify-between items-start text-[11px] bg-gray-50 p-3 rounded-xl border border-gray-200 print:bg-transparent print:border-none print:p-0">
            <div>
              <p className="text-gray-500 text-[9px] uppercase font-bold">Customer Details</p>
              <p className="font-bold text-sm text-gray-900">{order.customerName || order.customer || 'N/A'}</p>
              <p className="text-gray-600">{order.phone || 'No Phone'}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-[9px] uppercase font-bold">Invoice Info</p>
              <p className="font-bold text-amber-600 print:text-black">#{order.id || order._id || 'ORD-001'}</p>
              <p className="text-gray-500 text-[10px]">{order.date || new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Order Item Details */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300 text-[10px] uppercase text-gray-600">
                <th className="py-2">Item / Frame Size</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[11px]">
              <tr>
                <td className="py-2.5 font-bold">
                  {order.frameSize || order.size || 'Photo Frame'}
                  {order.notes && <p className="text-[9px] font-normal text-gray-500">{order.notes}</p>}
                </td>
                <td className="py-2.5 text-center font-bold">{order.quantity || 1}</td>
                <td className="py-2.5 text-right font-bold">Rs. {total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Payment Summary */}
          <div className="border-t-2 border-gray-300 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Total Amount:</span>
              <span className="font-bold">Rs. {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Advance Paid:</span>
              <span className="font-bold">- Rs. {advance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-black border-t pt-2 text-gray-900">
              <span>Balance Due:</span>
              <span className={balance > 0 ? 'text-red-600 print:text-black' : 'text-emerald-600'}>
                Rs. {balance.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="text-center pt-4 border-t border-dashed border-gray-300 space-y-1 text-[9px] text-gray-500">
            <p className="font-bold text-gray-700">Thank you for choosing MC STUDIO !</p>
            <p>Please present this invoice when collecting your order.</p>
          </div>

        </div>
      </div>
    </div>
  );
}