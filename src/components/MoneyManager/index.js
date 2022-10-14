import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    amount: undefined,
    income: 0,
    totalAmount: 0,
    expenses: 0,
    type: 'Income',
    transactionList: [],
    amountList: {},
  }

  onSumbitAmount = event => {
    event.preventDefault()

    const {title, income, expenses, amount, type, totalAmount} = this.state

    const newList = {
      title,
      amount,
      type,
      id: uuidv4(),
    }

    if (type === 'Income') {
      this.setState(prev => ({
        totalAmount: prev.totalAmount + parseInt(amount),
        income: prev.income + parseInt(amount),
      }))
    } else {
      this.setState(prev => ({
        totalAmount: prev.totalAmount - parseInt(amount),
        expenses: prev.expenses + parseInt(amount),
      }))
    }

    this.setState(prev => ({
      title: '',
      amount: '',

      transactionList: [...prev.transactionList, newList],
    }))
    //  console.log('hey')
  }

  deleteItem = id => {
    const {transactionList} = this.state
    const item = transactionList.find(each => each.id === id)
    // console.log(item, transactionList)
    if (item.type === 'Income') {
      this.setState(prev => ({
        totalAmount: prev.totalAmount - parseInt(item.amount),
        income: prev.income - parseInt(item.amount),
      }))
    } else {
      this.setState(prev => ({
        totalAmount: prev.totalAmount + parseInt(item.amount),
        expenses: prev.expenses - parseInt(item.amount),
      }))
    }
    const filteredList = transactionList.filter(each => each.id !== id)

    console.log(filteredList)
    this.setState({transactionList: filteredList})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {
      type,
      title,
      amount,
      transactionList,
      totalAmount,
      income,
      expenses,
    } = this.state

    return (
      <div className="bg">
        <div className="introCard">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <ul>
          <MoneyDetails
            text="Your Balance"
            imageUrl="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            altText="balance"
            className="amountCard"
            key="amountId"
            amount={totalAmount}
            testid="balanceAmount"
          />
          <MoneyDetails
            text="Your Income"
            imageUrl="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            altText="income"
            className="incomeCard"
            key="incomeId"
            amount={income}
            testid="incomeAmount"
          />
          <MoneyDetails
            text="Your Expenses"
            imageUrl="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            altText="expenses"
            className="expensesCard"
            key="expensesId"
            amount={expenses}
            testid="expensesAmount"
          />
        </ul>
        <div className="entireForm">
          <div className="formContainer">
            <form onSubmit={this.onSumbitAmount}>
              <h1>Add Transaction</h1>
              <label htmlFor="title" className="text">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                className="inputField"
                placeholder="TITLE"
                onChange={this.onChangeTitle}
                value={title}
              />
              <br />
              <label htmlFor="amount" className="text">
                AMOUNT
              </label>
              <br />
              <input
                type="number"
                id="amount"
                className="inputField"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
                value={amount}
              />
              <br />
              <p className="text">TYPE</p>
              <select
                value={type}
                id="typeOfAmount"
                className="inputField"
                onChange={this.onChangeType}
              >
                {transactionTypeOptions.map(each => (
                  <option id={each.optionId} value={each.displayText}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button className="btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="history">
            <h1>History</h1>
            <div className="elements">
              <div className="element">
                <p className="span">Title</p>
              </div>
              <div className="element">
                <p className="span">Amount</p>
              </div>
              <div className="element">
                <p className="span">Type</p>
              </div>
              <div className="element">
                <p className="span" />
              </div>
            </div>
            <ul className="historyConatine">
              {transactionList.map(each => (
                <TransactionItem
                  transactionItem={each}
                  deleteItem={this.deleteItem}
                  key={each.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
