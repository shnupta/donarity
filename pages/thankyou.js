import Head from "next/head";
import ArrowLink from "components/arrow-link";
import Layout from "../components/layout";
import PageTitle from "../components/page-title";
import Button from "../components/button";
import Router from "next/router";
import prisma from "lib/prisma";
import Confetti from "react-dom-confetti";
import { useSession } from "next-auth/client";

const config = {
  angle: "90",
  spread: 360,
  startVelocity: "50",
  elementCount: "80",
  dragFriction: 0.12,
  duration: "6980",
  stagger: 3,
  width: "21px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

export async function getServerSideProps({ query }) {
  var checkoutSession = await prisma.checkoutSession.findUnique({
    where: {
      sessionId: query.session_id,
    },
    include: {
      donation: {
        include: {
          charity: true,
        },
      },
      subscription: {
        include: {
          charity: true,
        },
      },
    },
  });

  checkoutSession = JSON.parse(
    JSON.stringify(checkoutSession, (key, value) =>
      typeof value === "Decimal" ? value.toString() : value
    )
  );

  return {
    props: { checkoutSession },
  };
}

export default function ThankYouPage({ checkoutSession }) {
  const [session, loading] = useSession();

  let subscriptionPage;
  let donationPage;
  if (checkoutSession.subscription) {
    subscriptionPage = (
      <>
        <Head>
          <title>Thank You!</title>
        </Head>
        <Layout headerImg={checkoutSession.subscription.charity.image}>
          <PageTitle>
            Thank you for your
            {checkoutSession.subscription
              ? ` ${checkoutSession.subscription.frequency}`
              : ""}{" "}
            donation to{" "}
            {checkoutSession.subscription
              ? checkoutSession.subscription.charity.name
              : checkoutSession.donation.charity.name}
          </PageTitle>
          <h4>
            Your £
            {checkoutSession.subscription
              ? checkoutSession.subscription.amount
              : checkoutSession.donation.amount}{" "}
            will make a big difference!
          </h4>

          <Button onClick={() => Router.push("/explore")}>Head Home</Button>
        </Layout>
      </>
    );
  } else {
    donationPage = (
      <>
        <Head>
          <title>Thank You!</title>
        </Head>
        <Layout headerImg={checkoutSession.donation.charity.image}>
          <PageTitle>
            Thank you for your donation to{" "}
            {checkoutSession.donation.charity.name}!
          </PageTitle>
          <div style={{alignItems: "center", marginLeft: "50%", width: "100%"}}>
            <Confetti active={!loading} config={config} />
          </div>
          <h4>
            Your £{checkoutSession.donation.amount} donation will make a big
            difference! Here's a big thank you from everyone at{" "}
            {checkoutSession.donation.charity.name}.
          </h4>

          <p>
            While you're here,{" "}
            <ArrowLink href="/explore">
              why not check out some other charities?
            </ArrowLink>
          </p>

          <Button onClick={() => Router.push("/explore")}>Head Home</Button>
        </Layout>
      </>
    );
  }
  if (checkoutSession.subscription) {
    return (
      <>
        {subscriptionPage}
        <Confetti active={!loading} config={config} />
      </>
    );
  } else {
    return <>{donationPage}</>;
  }
}
