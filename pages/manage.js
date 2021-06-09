import { UserRole } from '.prisma/client';
import { userSession } from 'lib/session';
import Head from 'next/head'
import Layout from '../components/layout'

export const getServerSideProps = async ({ req, res }) => {
    // Get the user's session based on the request
    const session = await userSession(req);
  
    if (JSON.stringify(session) === '{}') {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else if (session.userRole === UserRole.Charity) {
      return {
        redirect: {
          destination: "/my-charity",
          permanent: false,
        },
      };
    }
  
    return { props: {} };
  };

export default function ProfilePage() {
    return (
        <>
        <Head>
            <title>My Profile</title>
        </Head>
        <Layout>
            <div>
                <img src="/test/red-cross.png" alt=""
                        className="img-circle img-fluid" />
                <div>
                    <h2>Bella Moraru</h2>
                    <h5>Animal lover!!</h5>
                </div>
            </div>
            <h2>£10 monthly donations</h2>
            <h2>Following 8 charities</h2>
            <h2>Interests</h2>
            <h2>Donation History</h2>
        </Layout>
        </>
    )
}
