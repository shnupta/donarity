import styles from './stats-tile.module.css';

export default function StatsTile({total}) {
    return(
        <div className={styles.tile}>
            <div className={styles.content}>
                <h1>Total donated:</h1>
                <h1>£{total}</h1>
            </div>
        </div>
    )
}