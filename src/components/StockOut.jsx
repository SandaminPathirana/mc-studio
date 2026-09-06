import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function StockOut() {
  const stockOutRecords = [
    { id: 'OUT-042', item: 'Flush Mount Album Sheets (12x18)', quantity: 20, reason: 'Order #ORD-1024 (Kasun)', assignedTo: 'Printing Section', date: '02 Sep 2026' },
    { id: 'OUT-041', item: 'Wooden Photo Frame (16x24)', quantity: 2, reason: 'Order #ORD-1022 (Dilini)', assignedTo: 'Framing Team', date: '01 Sep 2026' },
    { id: 'OUT-040', item: 'Sony A7 IV Camera Body', quantity: 1, reason: 'Outdoor Shoot Dispatch', assignedTo: 'Lead Photographer', date: '30 Aug 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-textMain">Stock Out Management</h2>
          <p className="text-xs text-textMuted">Track materials used for orders or equipment assigned</p>
        </div>
        <button className="flex items-center gap-2 bg-accentRed hover:bg-red-600 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors">
          <ArrowUpRight size={16} />
          <span>Issue Stock Out</span>
        </button>
      </div>

      <div className="bg-bgCard border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-textMuted">
            <thead className="text-xs text-textMuted uppercase bg-gray-900/50 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Issue ID</th>
                <th className="py-3 px-4">Item Name</th>
                <th className="py-3 px-4">Quantity Used</th>
                <th className="py-3 px-4">Purpose / Reason</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {stockOutRecords.map((rec, idx) => (
                <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-accentRed">{rec.id}</td>
                  <td className="py-3.5 px-4 font-medium text-textMain">{rec.item}</td>
                  <td className="py-3.5 px-4 font-bold text-textMain">-{rec.quantity}</td>
                  <td className="py-3.5 px-4">{rec.reason}</td>
                  <td className="py-3.5 px-4">{rec.assignedTo}</td>
                  <td className="py-3.5 px-4 text-xs">{rec.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}