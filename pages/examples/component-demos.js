import Head from 'next/head'
import ExploreTile from '../../components/explore-tile'
import Layout from '../../components/layout'
import styles from '../../styles/ComponentDemos.module.css'
import PageTitle from '../../components/page-title'
import prisma from 'lib/prisma'

export async function getServerSideProps(context) {
  const charity = await prisma.charity.findUnique({
    where: {
      id: "test",
    },
  })

  return { props: { charity } };
};

export default function ComponentDemos({ charity }) {
  console.log("Hello!!\nThe Charity is\n" + charity);
  return (
    <>
    <Head>
      <title>Component Demo</title>
    </Head>
    <Layout>
      <PageTitle>Component Demos</PageTitle>
      <section className={styles.section}>
        <h1>Explore Tile:</h1>
        <h2 className={styles.subcomponent_title}>Vertical Explore Tile:</h2>
        <ExploreTile className={styles.vertical} charity={charity} />
        <h2 className={styles.subcomponent_title}>Horizontal Explore Tile:</h2>
        <ExploreTile className={styles.horizontal} horizontal charity={charity} />
      </section>
    </Layout>
    </>
  )
}