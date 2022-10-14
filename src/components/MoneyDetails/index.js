// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {text, imageUrl, altText, className, amount, testid} = props
  return (
    <li className={className}>
      {/* <div > */}
      <img src={imageUrl} alt={altText} className="image" />
      <div>
        <p>{text}</p>
        <h1 testid={testid}>RS {amount}</h1>
      </div>
      {/* </div> */}
    </li>
  )
}

export default MoneyDetails
