import styles from './checkbox.module.css';

export default function CheckBox({ className, checked, name, onClick }) {

  return (
    <label className={styles.container + (className ? " " + className : "")} onClick={onClick} >
      <input type="checkbox" checked={checked} className={styles.input} onChange={() => {}}/>
      <span className={styles.checkmark}></span>
      {name}
    </label>
  )
}