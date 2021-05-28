import styles from './arrow-link.module.css'
import Link from 'next/link'

export default function ArrowLink({ children, href }) {

    return (
        <Link href={href}><a className={styles.link}>{children}</a></Link>
    )
}