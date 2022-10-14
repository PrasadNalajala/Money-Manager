// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionItem, deleteItem} = props
  const {title, amount, type, id} = transactionItem

  const onDeleteItem = () => {
    // console.log('cliked')
    deleteItem(id)
  }
  return (
    <li className="elements1">
      <div className="element">
        <p className="span">{title}</p>
      </div>
      <div className="element">
        <p className="span">{amount}</p>
      </div>
      <div className="element">
        <p className="span">{type}</p>
      </div>
      <button
        type="button"
        testid="delete"
        className="deleteBtn"
        onClick={onDeleteItem}
      >
        <img
          className="dltImg"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
