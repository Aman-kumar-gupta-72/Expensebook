import React, { useState } from 'react';

const AddTransactionModal = ({ isOpen, onClose, onAddTransaction }) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('debit'); // Default to debit

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      date,
      description,
      category,
      amount: parseFloat(amount), // Convert amount to a number
      type,
    };
    onAddTransaction(newTransaction);
    // Clear form and close modal
    setDate('');
    setDescription('');
    setCategory('');
    setAmount('');
    setType('');
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed right-0 top-0 h-full min-h-screen w-1/2 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date:</label>
                <input 
                  type="date" 
                  id="date"
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
                <input 
                  type="text" 
                  id="description"
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category:</label>
                <input 
                  type="text" 
                  id="category"
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Amount:</label>
                <input 
                  type="number" 
                  id="amount"
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  required 
                  step="0.01"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type:</label>
                <select 
                  id="type"
                  value={type} 
                  onChange={(e) => setType(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="debit">Debit</option>
                  <option value="credit">Credit</option>
                </select>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Add Transaction
                </button>
              </div>
            </form>
            <div className="items-center px-4 py-3 mt-4">
              <button
                id="cancel-btn"
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;