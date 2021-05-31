import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/PageTitle.module.css'
import PageTitle from "../components/page-title";

export default function CharitiesPage()  {
    return (
        <>
        <Head>
            <title>Charities</title>
        </Head>
        <Layout>
            <PageTitle>
            <h1>Charities</h1>
            </PageTitle>
        </Layout>
        </>
    )
}