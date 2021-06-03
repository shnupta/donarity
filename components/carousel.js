import styles from "./carousel.module.css"

export default function Carousel({children}) {
    return (
        <div className={styles.container}>
            <div className={styles.item}>1</div>
            <div className={styles.item}>2</div>
            <div className={styles.item}>3</div>
            <div className={styles.item}>4</div>
            <div className={styles.item}>5</div>
        </div>
    )
}