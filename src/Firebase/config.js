import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Add a new transaction
export const addTransaction = async (userId, transactionData) => {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), {
      userId: userId,
      ...transactionData,
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};

// Get transactions for a user
export const getTransactions = async (userId) => {
  try {
    const q = query(collection(db, 'transactions'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const transactions = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    return transactions;
  } catch (e) {
    console.error('Error getting documents: ', e);
    throw e;
  }
};

// Update a transaction
export const updateTransaction = async (transactionId, newData) => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    await updateDoc(transactionRef, newData);
    console.log('Document with ID ', transactionId, ' successfully updated!');
  } catch (e) {
    console.error('Error updating document: ', e);
    throw e;
  }
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
  try {
    await deleteDoc(doc(db, 'transactions', transactionId));
    console.log('Document with ID ', transactionId, ' successfully deleted!');
  } catch (e) {
    console.error('Error deleting document: ', e);
    throw e;
  }
};
