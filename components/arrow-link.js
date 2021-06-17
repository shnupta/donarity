import styles from './arrow-link.module.css'
import Link from 'next/link'

export default function ArrowLink({ children, href, right, left, className, noAnchor }) {

    if (!noAnchor) {
        return (
            <Link href={href} passHref={true}>
                <a onClick={(click ? click : (() => {}))} className={styles.link + (right ? " " + styles.right : "") + (left ? " " + styles.left : "") + (className ? " " + className : "")}>
                    {children}
                </a>
            </Link>
        )
    } else {
        return (
            <div onClick={(click ? click : (() => {}))} className={styles.link + (right ? " " + styles.right : "") + (left ? " " + styles.left : "") + (className ? " " + className : "")}>
                {children}
            </div>
        )
    }
}