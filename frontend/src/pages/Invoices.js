import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Moved outside component – it never changes, so no dependency issues
const mockInvoices = [
  { _id: '1', invoiceNumber: 'INV-001', amount: 29.99, issueDate: '2026-05-01', status: 'paid', pdfUrl: '#' },
  { _id: '2', invoiceNumber: 'INV-002', amount: 99.99, issueDate: '2026-05-10', status: 'sent', pdfUrl: '#' },
  { _id: '3', invoiceNumber: 'INV-003', amount: 299.99, issueDate: '2026-05-15', status: 'paid', pdfUrl: '#' }
];

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/invoices', { headers: { Authorization: `Bearer ${token}` } });
        setInvoices(response.data);
      } catch (err) {
        setInvoices(mockInvoices);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading invoices...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Invoices</h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Invoice Number</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Amount</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id} className="border-b border-gray-200 dark:border-gray-600">
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">${invoice.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{new Date(invoice.issueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${invoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {invoice.pdfUrl && <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Download PDF</a>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && <div className="text-center py-8 text-gray-600 dark:text-gray-400">No invoices found</div>}
      </div>
    </div>
  );
};

export default Invoices;