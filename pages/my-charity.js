import { UserRole } from '.prisma/client';
import { userSession } from 'lib/session';
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
    } else if (session.userRole === UserRole.User) {
      return {
        redirect: {
          destination: "/explore",
          permanent: false,
        },
      };
    }
  
    return { props: {} };
  };

export default function MyCharityPage() {
    return (
        <Layout>
            <h1>My Charity</h1>
        </Layout>
    )
}