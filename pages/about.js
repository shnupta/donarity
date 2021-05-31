import Head from 'next/head'
import Layout from '../components/layout'

export default function AboutPage()  {
    return (
        <>
        <Head>
            <title>About</title>
        </Head>
        <Layout>
            <h1>About</h1>
            <h3>Donarity. A place for making donating easier.</h3>
            <h5>Donarity was created as a group software engineering project by 4 Computing students at Imperial College London.</h5>
        </Layout>
        </>
    )
}