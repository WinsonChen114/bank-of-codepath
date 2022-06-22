import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"
import { BrowserRouter, Routes, Route, } from "react-router-dom"
import TransactionDetail from "../TransactionDetail/TransactionDetail"

export default function App() {

  //Whether or not the app is currently requesting data from the API
  const [isLoading, setIsLoading] = React.useState(false)
  //List of bank transaction items fetched from the API
  const [transactions, setTransactions] = React.useState([])
  //List of bank transfer items fetched from the API
  const [transfers, setTransfers] = React.useState([])
  //Errors associated with fetching data from the API
  const [error, setError] = React.useState()
  //String value used to create a controlled input in the FilterInput.jsx component
  const [filterInputValue, setFilterInputValue] = React.useState("")
  const [newTransactionForm, setNewTransactionForm] = React.useState({description:"", category:"",  amount: 0})
  const [isCreating, setIsCreating] = React.useState(false)

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue} />
        <main>
          <Routes>
            <Route path="/" element={<Home transactions={transactions} setTransactions={setTransactions}
              transfers={transfers} setTransfers={setTransfers}
              error={error} setError={setError}
              isLoading={isLoading} setIsLoading={setIsLoading}
              filterInputValue={filterInputValue}
              newTransactionForm={newTransactionForm} setNewTransactionForm={setNewTransactionForm}
              isCreating={isCreating} setIsCreating={setIsCreating} />} />
            <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
          </Routes>

        </main>
      </BrowserRouter>
    </div>
  )
}
