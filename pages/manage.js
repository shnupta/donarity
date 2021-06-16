import { UserRole } from ".prisma/client";
import Head from "next/head";
import Layout from "../components/layout";
import { getSession, useSession } from "next-auth/client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTitle from "../components/page-title";
import HistoryTile from "../components/history-tile";
import ManageRecurringDonations from "../components/manage-recurring-donations";
import SimpleSlider from "@components/stats-slide";
import Button from "components/button";

import prisma from "lib/prisma";

import styles from "../styles/Manage.module.css";
import { getClientStripe } from "lib/clientStripe";
import { getServerStripe } from "lib/serverStripe";

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
        where: {
          completed: true,
        },
        include: {
          charity: true,
        },
      },
      subscriptions: {
        where: {
          active: true,
        },
        include: {
          charity: true,
        },
      },
    },
  });

  const donations = JSON.parse(
    JSON.stringify(user.donations, (key, value) =>
      typeof value === "Decimal" ? value.toString() : value
    )
  );

  const subscriptions = JSON.parse(
    JSON.stringify(user.subscriptions, (key, value) =>
      typeof value === "Decimal" ? value.toString() : value
    )
  );

  delete user.donations;
  delete user.subscriptions;

  const stripe = getServerStripe();
  const paymentMethods = await stripe.paymentMethods.list({
    customer: user.stripeCustomerId,
    type: "card",
  });
  const cards = paymentMethods.data;

  return { props: { user, donations, cards, subscriptions } };
}

export default function ProfilePage({ user, donations, cards, subscriptions }) {
  const addNewPaymentMethod = async () => {
    const stripe = await getClientStripe();

    const body = {
      userId: user.id,
      stripeCustomerId: user.stripeCustomerId,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout_sessions/setup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (response.status === 500) {
      console.error(response.statusText);
      return;
    }

    const session = await response.json();
    const sessionId = session.id;

    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    console.warn(error.message);
  };

  const recentDonationTiles = (donations) => {
    if (donations.length === 0) {
      return <p>No previous donations</p>;
    }
    var recentDonations = [];
    for (var i = 0; i < donations.length && i < 5; ++i) {
      recentDonations.push(<HistoryTile donation={donations[i]} />);
    }
    return recentDonations;
  };
  const total = donations.reduce(function (a, d) {
    return a + parseFloat(d.amount);
  }, 0);

  
  return (
    <>
      <Head>
        <title>Manage</title>
      </Head>
      <Layout>
        <PageTitle>Manage Donations</PageTitle>
        <Row className={styles.midSection}>
          <Col className={styles.profilePic} md={6}>
            <img src={user.image} alt="No Image!" />
          </Col>
          <Col className={styles.userName} md={6}>
            <div vertical layout>
              <h1>{user.name}</h1>
              <div
                style={{
                  textAlign: "right",
                  fontFamily: "'Dosis', sans-serif",
                  color: "var(--donarity-green)",
                }}
              >
                <h2>Total donations:</h2>
                <h2>£{total}</h2>
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles.statistics}>
          <h1>Statistics</h1>
          <SimpleSlider donations={donations} />
        </div>
        <div className={styles.section}>
          <ManageRecurringDonations user={user} subscriptions={subscriptions} />
        </div>
        <div className={styles.section}>
          <h1>Donation History</h1>
          {recentDonationTiles(donations)}
        </div>
        <div className={styles.section}>
          <h1>Payment Methods</h1>
          {cards.map((card, i) => (
            <div key={i}>{card.card.last4}</div>
          ))}
          <Button onClick={() => addNewPaymentMethod()}>Add New Method</Button>
        </div>
      </Layout>
    </>
  );
}
