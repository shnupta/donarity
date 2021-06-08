import Header from '../components/header'
import Head from 'next/head'

import styles from './layout.module.css'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://use.typekit.net/cma0rju.css" />
            </Head>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}