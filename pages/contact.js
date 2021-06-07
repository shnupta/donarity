import Head from 'next/head'
import Layout from '../components/layout'

export default function ContactPage() {
    return (
        <>
        <Head>
            <title>Contact Us</title>
        </Head>
        <Layout>
            <h1>Contact Us</h1>
            <h4>For any enquiries you have, please e-mail or call us on</h4>
            <h4>hello@donarity.co.uk</h4>
            <h4>+447896541235</h4>
        </Layout>
        </>
    )
}