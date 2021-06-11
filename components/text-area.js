import styles from './text-area.module.css'
import React from 'react'

export default function TextArea({ children, className, handler, maxChars }) {
  const [text, setText] = React.useState(children);

  const handleChange = (event) => {
    setText(event.target.value);
    handler(text);
  }

  return (
    <>
      <textarea maxLength={maxChars} className={styles.textArea + (className ? " " + className : "")} value={text} onChange={handleChange} />
      {maxChars && <p className={styles.maxChars}>{maxChars - text.length} characters left</p>}
    </>
  )
}