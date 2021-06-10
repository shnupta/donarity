import Header from '../components/header'
import Head from 'next/head'
import HeaderImage from './header-image'

import styles from './layout.module.css'

export default function Layout({ children, headerImg }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://use.typekit.net/cma0rju.css" />
            </Head>
            <Header />
            {headerImg && (<HeaderImage className={styles.headerImg} src={headerImg} />)}
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}