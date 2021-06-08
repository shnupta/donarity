import Layout from "../../components/layout";
import { useSession } from "next-auth/client";
import styles from "../../styles/Donate.module.css";
import Button from "../../components/button";
import CharitySummary from "../../components/charity-summary";
import PaymentForm from "../../components/payment-form";
import prisma from "../../lib/prisma";
import Router from "next/router";

export const getServerSideProps = async (context) => {
  // Find the model in prisma/schema.prisma
  const charity = await prisma.charity.findUnique({
    where: {
      id: context.params.id,
    },
  });

  // TODO: Check if found if not throw 404 page

  return { props: { charity } };
};

export default function DonatePage({ charity }) {
  const [session, loading] = useSession();

  const submitData = async (data) => {
    const body = data;
    body.charityId = charity.id;
    if (session) {
      body.userId = session.userId;
    }
    try {
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/thankyou");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <CharitySummary className={styles.summary} charity={charity} />
      <h1>New Donation</h1>

      <PaymentForm handler={submitData} />

      <h1 className={styles.or}>Or</h1>
      <Button className={styles.donate}>Add To Split Donations</Button>
    </Layout>
  );
}
