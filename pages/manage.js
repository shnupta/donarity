import { UserRole } from '.prisma/client';
import { userSession, hasSession } from 'lib/session';
import Head from 'next/head'
import Layout from '../components/layout'
import { getSession, useSession } from "next-auth/client";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import PageTitle from '../components/page-title'
import RecurringDonationTile from '../components/recurring-donation-tile'
import { DonationFrequency } from '@prisma/client'
import HistoryTile from '../components/history-tile'
import Button from '../components/button'
import Link from 'next/link'

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
        donations: {
          include: {
            charity: true,
          },
        },
      },
    })

    const donations = JSON.parse(JSON.stringify(user.donations,
      (key, value) => (typeof value === 'Decimal' ? value.toString() : value)))

    delete user.donations
  
    return { props: { user, donations } };
  };

export default function ProfilePage({ user, donations }) {
    
    const recentDonations = (donations) => {
      var recentDonations = []
      for (var i = 0; i < donations.length && i < 5; ++i) {
        // recentDonations.push(<DonationTile donation={donations[i]} />)
        recentDonations.push(<HistoryTile donation={donations[i]}/>)
      }
      return recentDonations;
    }

    console.log(donations);

    const recurringDonations = (donations) => {
      return donations.filter(donation => donation.frequency != DonationFrequency.Single)
                      .map(donation => <RecurringDonationTile className={styles.recurringDonationTile} donation={donation} />);
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
                { recurringDonations(donations) }
            </div>
            <Link href={"/explore"}>
              <Button>Explore more charities</Button>
            </Link>
            <div className={styles.history}>
                <h1>Donation History</h1>
                { recentDonations(donations) }
            </div>
        </Layout>
        </>
    )
}
