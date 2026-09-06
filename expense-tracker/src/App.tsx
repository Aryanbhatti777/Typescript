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

  const handleSubmit = (e: FormEvent): void => {
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

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions])

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Add Transaction" />
      </form>

      {transactions.map(item => {
        return (<div key={item.id}>
          <p>{item.description}</p>
          <h4>{item.amount}</h4>
          <p>{item.type}</p>
          <p>{item.category}</p>
          <p>{ item.date}</p>
        </div>)
      })}
    </>
  )
}

export default App
