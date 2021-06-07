import Head from 'next/head'
import ExploreTile from '../../components/explore-tile'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import styles from '../../styles/ComponentDemos.module.css'
import PageTitle from '../components/page-title'

export default function ComponentDemos() {
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
        <ExploreTile img="/test/dog.png" charityPage="#" width="400px">
          <h1>Dogs Trust</h1>
          <p>Our mission is to bring about the day when all dogs can enjoy a happy life, free from the threat of unnecessary destruction</p>
        </ExploreTile>
        <h2 className={styles.subcomponent_title}>Horizontal Explore Tile:</h2>
        <ExploreTile img="/test/red-cross.png" charityPage="#" width="90%" height="300px" horizontal>
          <h1>British Red Cross</h1>
          <h2>UK Coronavirus Response</h2>
          <p>The coronavirus outbreak is the greatest global health emergency in living memory. It is affecting the way we all go about our daily lives. In these uncertain times, small acts of kindness can make a huge difference.</p>
        </ExploreTile>
      </section>
    </Layout>
    </>
  )
}