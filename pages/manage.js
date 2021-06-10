import { UserRole } from '.prisma/client';
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

    const recurringDonations = donations.filter(donation => donation.frequency != DonationFrequency.Single);
    
    const recentDonationTiles = (donations) => {
      if (donations.length === 0) {
        return <p>No previous donations</p>
      }
      var recentDonations = []
      for (var i = 0; i < donations.length && i < 5; ++i) {
        recentDonations.push(<HistoryTile donation={donations[i]}/>)
      }
      return recentDonations;
    }

    const recurringDonationTiles = (donations) => {
        if (recurringDonations.length === 0) {
            return <p>Currently no recurring donations</p>
        }
        return recurringDonations.map(donation => <RecurringDonationTile className={styles.recurringDonationTile} donation={donation} />);
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
            <div className={styles.section}>
                <div className={styles.recurringTitle}>
                    <h1>Recurring Donations</h1>
                    <Button icon="/edit.svg"></Button>
                </div>
                { recurringDonationTiles(donations) }
                <Link href={"/explore"}>
                    <Button>Explore more charities</Button>
                </Link>
            </div>
            <div className={styles.section}>
                <h1>Donation History</h1>
                { recentDonationTiles(donations) }
            </div>
        </Layout>
        </>
    )
}
