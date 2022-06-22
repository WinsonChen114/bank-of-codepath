import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios"

export default function Home({ transactions = [], setTransactions = () => { },
  transfers = [], setTransfers = () => { },
  error, setError = () => { },
  isLoading, setIsLoading = () => { },
  filterInputValue,
  newTransactionForm, setNewTransactionForm = () => { },
  isCreating, setIsCreating = () => { } }) {

  React.useEffect(() => {
    setIsLoading(true)
    //Get transactions
    axios.get("http://localhost:3001/bank/transactions")
      .then((response) => {
        setTransactions(response.data.transactions)
        console.log(response.data)
        setIsLoading(false)
      })
      .catch((err) => setError(err))
    //Get transfers
    axios.get("http://localhost:3001/bank/transfers")
      .then((response) => {
        setTransfers(response.data.transfers)
        setIsLoading(false)
      })
      .catch((err) => setError(err))

  }, [])
  async function handleOnSubmitNewTransaction() {
    setIsCreating(true)
    console.log("Hello")
    axios.post("http://localhost:3001/bank/transactions", newTransactionForm)
      .then((response) => {
        console.log(newTransactionForm)
        console.log(response)
        setTransactions([...transactions, response.data.transaction])
        console.log(transactions)
        setIsCreating(false)
      }
      )
      .catch((err) => {
        setError(err)
        setIsCreating(false)
      })
  }
  let filteredTransactions = transactions.filter((transaction) => {
    //If not an empty string, filter so that the description contains the input value
    if (filterInputValue !== "") {
      return transaction.description.toLowerCase().includes(filterInputValue.toLowerCase())
    }
    else {
      return true
    }
  })

  return (
    <div className="home">
      <AddTransaction isCreating={isCreating} setIsCreating={setIsCreating} form={newTransactionForm} setForm={setNewTransactionForm}
        handleOnSubmit={handleOnSubmitNewTransaction} />
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && <BankActivity transactions={filteredTransactions} />}
      {error && <h2 className="error">{error}</h2>}
    </div>
  )
}
