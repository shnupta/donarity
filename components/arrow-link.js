import styles from './arrow-link.module.css'
import Link from 'next/link'

export default function ArrowLink({ children, href, right, left, className }) {

    return (
        <Link href={href} passHref={true}>
            <a className={styles.link + (right ? " " + styles.right : "") + (left ? " " + styles.left : "") + (className ? " " + className : "")}>
                {children}
            </a>
        </Link>
    )
}