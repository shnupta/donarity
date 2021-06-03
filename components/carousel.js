import styles from "./carousel.module.css"

export default function Carousel({children}) {
    return (
        <div className={styles.container}>
            <div class={styles.item}>1</div>
            <div class={styles.item}>2</div>
            <div class={styles.item}>3</div>
            <div class={styles.item}>4</div>
            <div class={styles.item}>5</div>
        </div>
    )
}