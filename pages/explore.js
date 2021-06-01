import Head from 'next/head'
import Link from 'next/link'

import Layout from '../components/layout'
import ExploreTile from '../components/explore-tile'
import ArrowLink from '../components/arrow-link'
import Carousel from '../components/carousel'

import styles from '../styles/Explore.module.css'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export default function ExplorePage() {
    return (
        <>
            <Head>
                <title>Explore</title>
            </Head>
            <Layout>
                <Container className={styles.page_title}>
                    <h1>Explore</h1>
                    <p>
                        Discover charities you are interested in, that match your values and that you are excited about, all on this page.
                        You can search, make use of various filters and explore by category!
                    </p>
                </Container>
                <Container className={styles.explore_section}>
                    <Row>
                        <Col>
                            <h2>Featured Charity</h2>
                        </Col>
                        <Col className={styles.recently_featured_link}>
                            <ArrowLink href="#">View recently featured charities</ArrowLink>
                        </Col>
                    </Row>
                    <ExploreTile img="/test/red-cross.png" charityPage="#" height="300px" horizontal>
                        <h1>British Red Cross</h1>
                        <h2>UK Coronavirus Response</h2>
                        <p>The coronavirus outbreak is the greatest global health emergency in living memory. It is affecting the way we all go about our daily lives. In these uncertain times, small acts of kindness can make a huge difference.</p>
                    </ExploreTile>
                </Container>
                <Container className={styles.explore_section}>
                    <h2>Popular Charities</h2>
                    <Carousel>

                    </Carousel>
                </Container>
            </Layout>
        </>
    )
}