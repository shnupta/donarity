import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/PageTitle.module.css'

export default function CharitiesPage()  {
    return (
        <>
        <Head>
            <title>Charities</title>
        </Head>
        <Layout>
            <section className={styles.section}>
            <h1>Charities</h1>
            </section>
        </Layout>
        </>
    )
}