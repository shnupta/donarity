import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import { useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  if (loading) return null

  return (
    <>
    <Head>
      <title>Donarity | Home</title>
    </Head>
    <Layout>
      <PageTitle>Donarity</PageTitle>
      <p>Welcome to donarity!!</p>
    </Layout>
    </>
  )
}
