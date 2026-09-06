import { useState, type FormEvent } from "react"
import type { Transaction } from "./types/transaction"


function App() {

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<Transaction["type"]>("income")
  const [category, setCategory] = useState<string>("")
  const [date, setDate] = useState<string>("")

 

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
    </>
  )
}

export default App
