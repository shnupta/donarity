
import Head from 'next/head'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import Button from '../components/button'
import Router from 'next/router'

export default function ThankYouPage() {
    return (
        <>
        <Head>
            <title>Thank You!</title>
        </Head>
        <Layout>
            <PageTitle>Thank You</PageTitle>
            <h4>Your donation will make a big difference!</h4>
            <Button onClick={() => Router.push('/explore')}>Head Home</Button>
        </Layout>
        </>
    )
}