import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction({ isCreating, setIsCreating = () => { }, form = {}, setForm = () => { }, handleOnSubmit = () => { } }) {
  function handleOnFormFieldChange(change) {
    //Keeps the rest of the form the same, changes the value that is supposed to be changed
    setForm({...form,
      [change.target.name]: change.target.value,
    })
    console.log(form)
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm handleOnFormFieldChange={handleOnFormFieldChange} handleOnSubmit={handleOnSubmit} form={form} isCreating={isCreating} />
    </div>
  )
}

export function AddTransactionForm({ handleOnFormFieldChange = () => { }, handleOnSubmit = () => { }, form }) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" placeholder="Description" value={form.description} onChange={handleOnFormFieldChange}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" placeholder="Category" value={form.category} onChange={handleOnFormFieldChange}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input type = "number" name="amount" placeholder="Amount" value={form.amount} onChange={handleOnFormFieldChange}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
