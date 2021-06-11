import styles from './button.module.css'

export default function Button({ children, className, onClick, white, icon }) {
    return (
        <button
          className={styles.button + (className ? " " + className : "") + (white ? " " + styles.white : "")}
          onClick={onClick ? onClick : () => {}}
        >
          {icon && <img src={icon} className={children ? "" : styles.iconOnly} />}
          <span>{children}</span>
        </button>
    )
}