import styles from './button.module.css'

export default function Button({ children, className, onClick, white, icon, disabled }) {
    return (
        <button
          disabled={disabled}
          className={styles.button + (className ? " " + className : "") + (white ? " " + styles.white : "") + (disabled ? " " + styles.disabled : "")}
          onClick={onClick ? onClick : () => {}}
        >
          {icon && <img src={icon} className={children ? "" : styles.iconOnly} />}
          <span>{children}</span>
        </button>
    )
}