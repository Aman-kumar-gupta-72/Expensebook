import React, { useState, useEffect } from 'react';
import AddTransactionModal from '../Component/AddTransactionModel';
import { getTransactions, addTransaction } from '../Firebase/config';
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase/firebase';
import { collection, query, where, onSnapshot } from '../Firebase/firebase';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userTransactions = [];
        querySnapshot.forEach((doc) => {
          userTransactions.push({ id: doc.id, ...doc.data() });
        });
        setTransactions(userTransactions);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const currentBalance = transactions.reduce((balance, transaction) => {
    return transaction.type === 'credit'
      ? balance + transaction.amount
      : balance - transaction.amount;
  }, 0);

  useEffect(() => {
    const filtered = sortedTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return transactionDate >= start && transactionDate <= end;
      } else if (start) {
        return transactionDate >= start;
      } else if (end) {
        return transactionDate <= end;
      } else {
        return true;
      }
    });
    setFilteredTransactions(filtered);
  }, [transactions, startDate, endDate]);

  const handleAddTransaction = async (newTransactionData) => {
    if (user) {
      try {
        await addTransaction(user.uid, newTransactionData);
        const userTransactions = await getTransactions(user.uid);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-yellow-300 to-pink-500">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-7xl mx-auto mt-20">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">Dashboard</h1>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md mb-6 text-center">
          <h3 className="text-lg sm:text-xl font-semibold">Current Balance</h3>
          <p className="text-3xl sm:text-4xl font-bold mt-2">&#8377; {currentBalance.toFixed(2)}</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap mb-6">
          <div className="flex gap-2 w-full md:w-auto">
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 border rounded-md py-2 px-3 text-gray-700 focus:outline-none"
            />
            <span className="text-gray-600">-</span>
            <input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="flex-1 border rounded-md py-2 px-3 text-gray-700 focus:outline-none"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">
              Export
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Transaction
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Transaction History</h2>
          <table className="min-w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Description</th>
                <th className="text-left py-2 px-4">Category</th>
                <th className="text-left py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="py-2 px-4">{transaction.date}</td>
                    <td className="py-2 px-4">{transaction.description}</td>
                    <td className="py-2 px-4">{transaction.category}</td>
                    <td className="py-2 px-4">&#8377; {transaction.amount.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default Dashboard;
