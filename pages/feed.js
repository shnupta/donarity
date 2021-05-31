import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/PageTitle.module.css'

export default function FeedPage() {
    return  (
        <>
        <Head>
            <title>My Feed</title>
        </Head>
        <Layout>
            <section className={styles.section}>
            <h1>Feed</h1>
            </section>
        </Layout>
        </>
    )
}