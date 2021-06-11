import { useState } from "react"
import styles from './text-input.module.css'

export default function TextInput({ value, active, placeholder, icon, number, className, onChange, onFocus }) {
  return (
    <div className={(className ? className + " " : "") + styles.textInput} onClick={() => onFocus()}>
      {icon && <span className={active ? styles.active : ""}><img src={icon} /></span>}
      <input type={number ? "number" : "text"}
             placeholder={placeholder}
             value={value}
             onChange={(event) => onChange(event.target.value)}
             onKeyUp={(event) => onChange(event.target.value)}
      />
    </div>
  )
}