import Header from '../components/header'
import Head from 'next/head'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/cma0rju.css" />
            </Head>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}