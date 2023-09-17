import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpenseModal from "../components/Modals/AddExpense";
import AddIncomeModal from "../components/Modals/AddIncome";
import { toast } from "react-toastify";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment/moment";
import TransactionsTable from "../components/TransactionsTable";
import ChartComponent from "../components/Charts";
import NoTransactions from "../components/NoTransaction";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const onFinish = (values, type) => {
    //    console.log("onFinish", values, type)

    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };
  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with id :", docRef.id);
      if (!many) toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document:", e);
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  // const fetchTransactions=
  //      useCallback(async()=>{
  //      setLoading(true)
  //      if(user){
  //         const q= query(collection(db, `users/${user.uid}/transactions`));
  //         const querySnapshot= await getDocs(q);
  //         let transactionsArray=[];
  //         querySnapshot.forEach((doc)=>{
  //             // doc.data() is never undefined for query doc snapshots
  //             transactionsArray.push(doc.data());
  //         })
  //         setTransactions(transactionsArray);
  //         console.log(transactionsArray);
  //         toast.success("Transaction Fetched!");
  //      }
  //      setLoading(false)
  // },[user]);

  // useEffect(()=>{
  //     //Get all docs from collection
  //     if(user){
  //         fetchTransactions();
  //     }
  //     },[user,fetchTransactions])
  useEffect(() => {
    fetchTransactions();
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("Transactions Array", transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expensesTotal = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  }

  let sortedTransactions= transactions.sort((a, b)=>{
       return new Date(a.date) - new Date(b.date)
  })
  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transactions.length !==0 ? <ChartComponent sortedTransactions={sortedTransactions}/> : <NoTransactions />}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
