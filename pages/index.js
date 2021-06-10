import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import { getSession, useSession } from 'next-auth/client'
import { UserRole } from '.prisma/client'

export const getServerSideProps = async (context) => {
  // Get the user's session based on the request
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: session.userRole === UserRole.User ? "/explore" : "/my-charity",
        permanent: false,
      },
    };
  } 
  return { props: {} };
};

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
