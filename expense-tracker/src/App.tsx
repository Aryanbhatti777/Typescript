import { useEffect, useState, type FormEvent } from "react"
import type { Transaction } from "./types/transaction"


function App() {
  const transactionsFetched = localStorage.getItem("transactions")

  const [transactions, setTransactions] = useState<Transaction[]>(transactionsFetched ? JSON.parse(transactionsFetched) : [])
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<Transaction["type"]>("income")
  const [category, setCategory] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [editingId, setEditingId] = useState<number>(0)


  const addTransaction = (e: FormEvent): void => {
    e.preventDefault();

    const transaction: Transaction = {
      id: Date.now(),
      description,
      amount,
      type,
      category,
      date
    }

    setTransactions((prev) => [...prev, transaction])
    setAmount(0);
    setDescription("")
    setType("income")
    setCategory("")
    setDate("")
  }

  const getIncome = (): number => {
    
    const income = transactions.reduce((acc, curr) => {
      if (curr.type === "income") {
        return acc + curr.amount;
      }
      return acc
    },0)
    return income
  }

  const getExpense = (): number => {
    
    const income = transactions.reduce((acc, curr) => {
      if (curr.type === "expense") {
        return acc + curr.amount;
      }
      return acc
    },0)
    return income
  }

  const getBalance = (): number => {
    const income = getIncome();
    const expense = getExpense();
    const balance = income - expense;
    return balance
  }

  const handleDelete = (id: number): void => {
    const filtered: Transaction[] = transactions.filter(item => item.id !== id);
    setTransactions(filtered)
  }

  const setEdit = (txn: Transaction): void => {
    setAmount(txn.amount)
    setCategory(txn.category);
    setDescription(txn.description)
    setDate(txn.date)
    setType(txn.type)
    setEditingId(txn.id)
  }

  const handleEdit = (e: FormEvent, id: number): void => {
    e.preventDefault();
    const transaction: Transaction = {
      id,
      description,
      amount,
      type,
      category,
      date
    }
    const updated = transactions.map(item => item.id === id ? transaction : item)
    setTransactions(updated)
    setEditingId(0)
    setAmount(0);
    setDescription("");
    setType("income");
    setCategory("");
    setDate("");
  } 

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions])



  return (
    <>
      <div className="totalIncome">
        <div>
          <h3>Total Income</h3>
          <p>{getIncome()}</p>
        </div>
        <div>
          <h3>Total Expense</h3>
          <p>{getExpense()}</p>
        </div>
        <div>
          <h3>Balance</h3>
          <p>{getBalance()}</p>
        </div>
      </div>
      <form onSubmit={editingId ? (e) => handleEdit(e,editingId) : (e) => addTransaction(e)}>
        <label htmlFor="">Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="">Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <label htmlFor="Type"></label>
        <select name="" id="" value={type} onChange={(e) => setType(e.target.value as Transaction["type"])}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="">Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <label htmlFor="">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="submit" value={editingId ? "Update" : "Add"} />
      </form>

      {transactions.map(item => {
        return (<div key={item.id}>
          <p>{item.description}</p>
          <h4>{item.amount}</h4>
          <p>{item.type}</p>
          <p>{item.category}</p>
          <p>{item.date}</p>
          <button onClick={() => setEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>)
      })}
    </>
  )
}

export default App
