import { useState } from "react"
import styles from './text-input.module.css'

export default function TextInput({ active, placeholder, icon, number }) {
  return (
    <div>
      <div className={styles.textInput}>
        <span className={active ? styles.active : ""}><img src={icon} /></span>
        <input type={number ? "number" : "text"} placeholder={placeholder} />
      </div>
    </div>
  )
}