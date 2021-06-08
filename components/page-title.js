import styles from './page-title.module.css'

export default function PageTitle({ children }) {
  return <h1 className={styles.pageTitle}>{children}</h1>
}