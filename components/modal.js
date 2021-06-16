import styles from './modal.module.css'

export default function Modal({ children, className, open, onClose }) {

  const handleClick = (event) => {
    if (event.target.className.includes(styles.container)) {
      onClose();
    }
  }

  return (
    <div className={styles.container + (open ? " " + styles.open : "")} onMouseDown={(event) => handleClick(event)}>
      <div className={styles.modal + (className ? " " + className : "")}>
        <img onClick={() => onClose()} className={styles.close} src="/cross.svg" />
        <div className={styles.modalGuts}>
          {children}
        </div>
      </div>
    </div>
  )
}