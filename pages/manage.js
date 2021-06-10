import { UserRole } from '.prisma/client';
import { userSession, hasSession } from 'lib/session';
import Head from 'next/head'
import Layout from '../components/layout'
import { getSession, useSession } from "next-auth/client";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import PageTitle from '../components/page-title'

import prisma from 'lib/prisma'

import styles from '../styles/Manage.module.css'

export async function getServerSideProps({ req, res }) {
    const session = await userSession(req);

    if (!hasSession(session)) {
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

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      include: {
        donations: true,
      },
    })

    const donations = JSON.parse(JSON.stringify(user.donations,
      (key, value) => (typeof value === 'Decimal' ? value.toString() : value)))

    console.log(donations);

    delete user.donations
  
    return { props: { user, donations } };
  };

export default function ProfilePage({ user, donations }) {
    console.log(user);
    console.log(donations);
    
    const recentDonations = (donations) => {
      var recentDonations = []
      for (var i = 0; i < donations.length && i < 5; ++i) {
        // recentDonations.push(<DonationTile donation={donations[i]} />)
        recentDonations.push(<li>{ donations[i].amount }</li>)
      }
      return recentDonations;
    }


    return (
        <>
        <Head>
            <title>Manage</title>
        </Head>
        <Layout>
            <PageTitle>Manage Donations</PageTitle>
            <Row className={styles.midSection}>
                <Col className={styles.profilePic} md={6}>
                    <img src={ user.image } alt="No Image!"/>
                </Col>
                <Col className={styles.userName} md={6}>
                    <h1>{ user.name }</h1>
                </Col>
            </Row>
            <div className={styles.history}>
                <h1>Recurring Donations</h1>
                { recentDonations(donations) }
            </div>
            <div className={styles.history}>
                <h1>Donation History</h1>
                { recentDonations(donations) }
            </div>
        </Layout>
        </>
    )
}
