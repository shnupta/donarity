import styles from './button.module.css'

export default function Button({ children, className, onClick, white }) {
    return (
        <button
          className={styles.button + (className ? " " + className : "") + (white ? " " + styles.white : "")}
          onClick={onClick ? onClick : () => {}}
        >
          {children}
        </button>
    )
}