import Head from "next/head";
import Layout from "../components/layout";
import PageTitle from "../components/page-title";
import Button from "../components/button";
import Router from "next/router";
import prisma from 'lib/prisma'

export async function getServerSideProps({ query }) {
  var checkoutSession = await prisma.checkoutSession.findUnique({
    where: {
      sessionId: query.session_id,
    },
    include: {
      charity: true,
    },
  });

  console.log(checkoutSession);

  checkoutSession = JSON.parse(JSON.stringify(checkoutSession, 
    (key, value) => (typeof value === 'Decimal' ? value.toString() : value)))

  return {
    props: { checkoutSession },
  };
}

export default function ThankYouPage({ checkoutSession }) {
  return (
    <>
      <Head>
        <title>Thank You!</title>
      </Head>
      <Layout>
        <PageTitle>
          Thank you for your donation to {checkoutSession.charity.name}
        </PageTitle>
        <h4>
          Your £{checkoutSession.amount} donation will make a big difference!
        </h4>

        <Button onClick={() => Router.push("/explore")}>Head Home</Button>
      </Layout>
    </>
  );
}
