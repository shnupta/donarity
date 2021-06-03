import styles from '../styles/PageTitle.module.css'

export default function PageTitle({children}) {
    return (
        <section className={styles.section}>{children}</section>
    )
}