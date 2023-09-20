import React, { useState } from "react";
import { Table, Select, Radio } from "antd";
import searchImg from "../../assets/Search.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

function TransactionsTable({ transactions, addTransaction, fetchTransactions}) {
    const {Option}= Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter]= useState("");
  const[sortKey, setSortKey]=useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // Add this state

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
  );

  // let sortedTransactions= [...filteredTransactions].sort((a,b)=>{
  //   if(sortKey=== "date"){
  //       return new Date(a.date)- new Date(b.date)
  //   }
  //   else if(sortKey==="dateDes"){
  //     return new Date(b.date)- new Date(a.date)
  //   }
  //   else if(sortKey==="amount"){
  //       return a.amount - b.amount
  //   }
  //   else if(sortKey==="amountDes"){
  //     return b.amount - a.amount
  //   }
  //   else{
  //       return 0;
  //   }
  // })
  let sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      // Check the sort direction and adjust the comparison accordingly
      if (sortDirection === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    } else if (sortKey === "amount") {
      // Check the sort direction and adjust the comparison accordingly
      if (sortDirection === "asc") {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    } else {
      return 0;
    }
  });

  // Toggle the sort direction when the sort key is changed
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
   
  function exportCSV(){
    const csv = unparse( {
      fields: ["name", "type", "date", "amount", "tag"],
      data:transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="table-div"
    style={{
      width: "100%",
      padding: "0rem 2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "1rem",
        marginTop:"0.5rem"
      }}
    >
    <div className="input-flex">
          <img src={searchImg} width="16" />
         <input
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Search By Name"
      />
        </div>
       <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
        </div>
        <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2 className="table-h2">My Transactions</h2>

          {/* <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date (↑)</Radio.Button>
            <Radio.Button value="dateDes">Sort by Date (↓)</Radio.Button>
            <Radio.Button value="amount">Sort by Amount(↑)</Radio.Button>
            <Radio.Button value="amountDes">Sort by Amount(↓)</Radio.Button>
          </Radio.Group> */}
           <Radio.Group
            className="input-radio"
            onChange={(e) => {
              setSortKey(e.target.value);
              toggleSortDirection(); // Toggle the sort direction when changing the sort key
            }}
            value={sortKey}
          >
            <Radio.Button value="" className="rd-btn">No Sort</Radio.Button>
            <Radio.Button value="date" className="rd-btn">Sort by Date</Radio.Button>
            <Radio.Button value="amount" className="rd-btn rd-amount">Sort by Amount</Radio.Button>
          </Radio.Group>

          <Radio.Group
            className="input-radio"
            onChange={() => toggleSortDirection()} // Toggle the sort direction directly
            value={sortDirection === "asc" ? "asc" : "desc"}
          >
            <Radio.Button value="asc" className="rd-btn">Ascending</Radio.Button>
            <Radio.Button value="desc" className="rd-btn">Descending</Radio.Button>
          </Radio.Group>
          <div className="csv-div"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "350px",
            }}
          >
            <button className="btn exp-btn-csv"  onClick={exportCSV} >
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue imp-btn-csv">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
              onChange={importFromCsv}
            />
          </div>
        </div>
      <Table dataSource={sortedTransactions} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionsTable;
