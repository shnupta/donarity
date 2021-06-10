import { UserRole } from '.prisma/client';
import Head from 'next/head'
import Layout from '../components/layout'
import { getSession, useSession } from "next-auth/client";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import styles from '../styles/Manage.module.css'

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
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
  
    return { props: { session } };
  };

export default function ProfilePage({ session }) {
    console.log(session);
    return (
        <>
        <Head>
            <title>Manage</title>
        </Head>
        <Layout>
            <Row className={styles.titleSection}>
                <h1>Manage Donations</h1>
            </Row>
            <Row className={styles.midSection}>
                <Col className={styles.profilePic} md={6}>
                    <img src={ session.user.image } alt="No Image!"/>
                </Col>
                <Col className={styles.userName} md={6}>
                    <h1>{ session.user.name }</h1>
                </Col>
            </Row>
            <Row className={styles.history}>
                <h1>Donation History</h1>
            </Row>
        </Layout>
        </>
    )
}
