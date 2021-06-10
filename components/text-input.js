import { useState } from "react"
import styles from './text-input.module.css'

export default function TextInput({ active, placeholder, icon, number, className, handler, children }) {
  const [amount, setAmount] = useState(null);

  const handleAmountChanged = (changedAmount) => {
    setAmount(changedAmount);
    focused();
  }

  const focused = () => {
    handler(amount);
  }

  return (
    <div className={(className ? className + " " : "") + styles.textInput} onClick={(event) => focused()}>
      {icon && <span className={active ? styles.active : ""}><img src={icon} /></span>}
      <input type={number ? "number" : "text"} placeholder={placeholder} value={children} onChange={(event) => handleAmountChanged(event.target.value)} onKeyUp={(event) => handleAmountChanged(event.target.value)} />
    </div>
  )
}