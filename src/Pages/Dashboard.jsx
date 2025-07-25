import React, { useState, useEffect } from 'react';
import AddTransactionModal from '../Component/AddTransactionModel';
import { getTransactions,addTransaction } from '../Firebase/config'; // Import firestoreService
import { getAuth } from 'firebase/auth'; 
import { db } from '../Firebase/firebase'; // Import db
import { collection, query, where, onSnapshot } from '../Firebase/firebase'; // Import Firestore functions
// Import getAuth

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const auth = getAuth(); // Get the auth instance
  const user = auth.currentUser; // Get the current user

  // Fetch transactions from Firestore when the component mounts or user changes
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

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [user]); // Depend on the user

  // Sort transactions by date in descending order
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate current balance
  const currentBalance = transactions.reduce((balance, transaction) => {
    if (transaction.type === 'credit') {
      return balance + transaction.amount;
    } else {
      return balance - transaction.amount;
    }
  }, 0);

  // Filter transactions based on date range whenever transactions, startDate, or endDate changes
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
        return true; // No date range selected, show all transactions
      }
    });
    setFilteredTransactions(filtered);
  }, [transactions, startDate, endDate]); // Re-run effect when transactions, startDate, or endDate change

  const handleAddTransaction = async (newTransactionData) => {
    if (user) {
      try {
        await addTransaction(user.uid, newTransactionData);
        // After adding, refetch transactions to update the list
        const userTransactions = await getTransactions(user.uid);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    }
  };

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(to right top, #f9d423, #ff4e50)' }}>
      <div className="dashboard-container bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

        <div className="balance-card bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold">Current Balance</h3>
          <p className="text-4xl font-bold"> &#8377;
{currentBalance.toFixed(2)}</p>
        </div>

        <div className="dashboard-actions flex items-center space-x-4 mb-6">
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-grow border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
           <span>-</span>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-grow border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Export</button>
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            onClick={() => setIsModalOpen(true)}
          >
            Add Transaction
          </button>
        </div>

        <div className="transaction-history bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Transaction History</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr key={transaction.id} className="border-t">
                  <td className="py-2">{transaction.date}</td>
                  <td className="py-2">{transaction.description}</td>
                  <td className="py-2">{transaction.category}</td>
                  <td className="py-2">{transaction.amount.toFixed(2)}</td>
                </tr>
              ))}
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