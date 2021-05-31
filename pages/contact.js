import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/PageTitle.module.css'

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact Us</title>
            </Head>
            <Layout>
                <section className={styles.section}>
                    <p><h1>Contact Us</h1></p>
                    <p><h4>For any enquiries you have, please e-mail or call us on</h4>
                    </p>
                    <p>
                        <h4>hello@donarity.co.uk</h4>
                        <h4>+447896541235</h4>
                    </p>
                </section>
            </Layout>
        </>
    )
}