import Head from 'next/head'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'

export default function ContactPage() {
    return (
        <>
        <Head>
            <title>Contact Us</title>
        </Head>
        <Layout>
            <PageTitle>Contact Us</PageTitle>
            <h4>For any enquiries you have, please e-mail or call us on</h4>
            <h4>hello@donarity.co.uk</h4>
            <h4>+447896541235</h4>
        </Layout>
        </>
    )
}