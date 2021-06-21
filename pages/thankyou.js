import Head from "next/head";
import ArrowLink from "components/arrow-link";
import Layout from "../components/layout";
import PageTitle from "../components/page-title";
import Button from "../components/button";
import Router from "next/router";
import prisma from "lib/prisma";
import Confetti from "react-dom-confetti";
import { signIn, useSession } from "next-auth/client";
import { DonationFrequency } from ".prisma/client";
import SuggestionTile from "../components/suggestion-tile";

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


  //find users that have donated to common charity
  //also need to check if it's subscription or donation
  if (checkoutSession.subscription === null) {
    var donation = await prisma.donation.findMany({
      where: {
        charity: checkoutSession.donation.charity,
        NOT: {
          userId: checkoutSession.donation.userId
        },
      }
    })
  } else {
    var donation = await prisma.donation.findMany({
      where: {
        charity: checkoutSession.subscription.charity,
        NOT: {
          userId: checkoutSession.subscription.userId
        },
      }
    })
  }

  donation = JSON.parse(
    JSON.stringify(donation, (key, value) =>
      typeof value === "Decimal" ? value.toString() : value
    )
  );

  //grab the first user (or we can randomise this later)
  //and grab the list of charities this user donates to 
  //(apart from the one just donated to)
  if (donation.length === 0) {
    donation = null
  } else {
    var charities = await prisma.donation.findMany({
      where: {
        userId: donation[0].userId,
        NOT: {
          charityId: donation[0].charityId,
        },
      },
      include: {
        charity: true,
      }
    })
  }

  charities = JSON.parse(
    JSON.stringify(charities, (key, value) =>
      typeof value === "Decimal" ? value.toString() : value
    )
  );

  return {
    props: { checkoutSession, donation, charities },
  };
}

export default function ThankYouPage({ checkoutSession, donation, charities }) {
  const [session, loading] = useSession();

  let subscriptionPage;
  let donationPage;
  let subscriptionFrequency;

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  let uniqueCharities = new Map();

  if (charities != null) {
    for (let i = 0; i < charities.length; ++i) {
      if (!uniqueCharities.has(charities.charityId)) {
        uniqueCharities.set(charities[i].charityId, charities[i]);
      }
    }
  }

  //console.log(checkoutSession)

  const list = Array.from(uniqueCharities)
  const listDisplay = [];
  
  for (let i = 0; i < list.length && listDisplay.length < 3; ++i){
    if (checkoutSession.donation != null) {
      if (checkoutSession.donation.charity.categoryId === list[i][1].charity.categoryId) {
        listDisplay.push(list[i][1]);
      }
    } else {
      if (checkoutSession.subscription.charity.categoryId === list[i][1].charity.categoryId) {
        listDisplay.push(list[i][1]);
      }
    }
  }

  for (let j = 0; j < list.length && listDisplay.length < 3; ++j) {
    if (checkoutSession.donation != null) {
      if (checkoutSession.donation.charity.categoryId != list[j][1].charity.categoryId) {
        listDisplay.push(list[j][1]);
      }
    } else {
      if (checkoutSession.subscription.charity.categoryId != list[j][1].charity.categoryId) {
        listDisplay.push(list[j][1]);
      }
    }
  }

  if (checkoutSession.subscription) {
    subscriptionFrequency = checkoutSession.subscription.frequency === DonationFrequency.Monthly ? "monthly" : "annual"
    subscriptionPage = (
      <>
        <Head>
          <title>Thank You!</title>
        </Head>
        <Layout headerImg={checkoutSession.subscription.charity.image}>
          <PageTitle>
            Thank you for your {subscriptionFrequency} donation to {checkoutSession.subscription.charity.name}!
          </PageTitle>
          <div
            style={{ alignItems: "center", marginLeft: "50%", width: "100%" }}
          >
            <Confetti active={!loading} config={config} />
          </div>
          <h4>
            Your £{checkoutSession.subscription.amount} will make a big
            difference! Here's a big thank you from everyone at{" "}
            {checkoutSession.subscription.charity.name}.
          </h4>

          <p>
            While you're here,{" "}
            <ArrowLink href="/explore">
              why not check out some other charities?
            </ArrowLink>
          </p>

          {session && (<Button onClick={() => Router.push("/manage")}>Manage Donations</Button>)}
          {!session && (<>
            <h2 style={{fontWeight: 700, fontSize: "1.5em"}}>Create an account in 30 seconds to keep track of your donations in the future</h2>
            <Button onClick={() => signIn("auth0", { callbackUrl: base_url + "/explore" })}>Sign Up!</Button>
            </>)}
          <div style={{marginTop:"2em"}}>
            <h1>Users who donated to {checkoutSession.subscription.charity.name} also donated to:</h1>
            {listDisplay.map((c, i) => (<SuggestionTile key={i} name={c.charity.name} img={c.charity.logo} charityId={c.charityId}/>))}
          </div>
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
            Thank you for your donation to {checkoutSession.donation.charity.name}!
          </PageTitle>
          <div
            style={{ alignItems: "center", marginLeft: "50%", width: "100%" }}
          >
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

          {session && (<Button onClick={() => Router.push("/manage")}>Manage Donations</Button>)}
          {!session && (<>
            <h2 style={{fontWeight: 700, fontSize: "1.5em"}}>Create an account in 30 seconds to keep track of your donations in the future</h2>
            <Button onClick={() => signIn("auth0", { callbackUrl: base_url + "/explore" })}>Sign Up!</Button>
            </>)}

          <div style={{marginTop:"2em"}}>
            <h1>Users who donated to {checkoutSession.donation.charity.name} also donated to:</h1>
            {listDisplay.map((c, i) => (<SuggestionTile key={i} name={c.charity.name} img={c.charity.logo} charityId={c.charityId}/>))}
          </div>
        </Layout>
      </>
    );
  }
  if (checkoutSession.subscription) {
    return (
      <>
        {subscriptionPage}
      </>
    );
  } else {
    return (
      <>
        {donationPage}
      </>
    );
  }
}
