import Layout from "../../components/layout";
import { getSession, useSession } from "next-auth/client";
import styles from "../../styles/Donate.module.css";
import Button from "../../components/button";
import CharitySummary from "../../components/charity-summary";
import PaymentForm from "../../components/payment-form";
import prisma from "../../lib/prisma";

import { getClientStripe } from "../../lib/clientStripe";

export const getServerSideProps = async (context) => {
  // Find the model in prisma/schema.prisma
  const charity = await prisma.charity.findUnique({
    where: {
      id: context.params.id,
    },
  });

  if (!charity) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const session = await getSession(context);

  return { props: { charity, session } };
};

export default function DonatePage({ charity, session }) {
  const submitData = async (data) => {
    const body = data;
    body.charityId = charity.id;
    if (session) {
      body.userId = session.userId;
    }
    // Body: frequency, amount, charityId, userId?
    // To come: projectId?

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/checkout_sessions/",
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

    const stripe = await getClientStripe();
    if (!stripe) {
      console.error("Couldn't load stripe.");
      return;
    }
    const resBody = await response.json();
    const sessionId = await resBody.id;
    const paymentIntentId = await resBody.payment_intent;
    const stripeCustomerId = await resBody.customer;
    const sessionBody = {
      sessionId: sessionId,
      userId: session ? session.userId : null,
      charityId: charity.id,
      amount: data.amount,
      frequency: data.frequency,
      paymentIntentId: paymentIntentId,
      stripeCustomerId: stripeCustomerId,
    };

    const newSessionResponse = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/checkout_sessions/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionBody),
      }
    );

    if (!newSessionResponse.ok) {
      console.error(newSessionResponse.statusText);
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    console.warn(error.message);
  };

  return (
    <Layout>
      <CharitySummary className={styles.summary} charity={charity} />
      <h1>New Donation</h1>

      <PaymentForm handler={submitData} session={session} />

      <h1 className={styles.or}>Or</h1>
      <Button className={styles.donate}>Add To Split Donations</Button>
    </Layout>
  );
}
