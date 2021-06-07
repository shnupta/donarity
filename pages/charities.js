import Head from 'next/head'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'

export default function CharitiesPage()  {
    return (
        <>
        <Head>
            <title>Charities</title>
        </Head>
        <Layout>
            <PageTitle>Charities</PageTitle>
        </Layout>
        </>
    )
}