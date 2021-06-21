import Head from 'next/head'
import styles from '../styles/Home.module.css'
import buttonStyles from "../styles/Charity.module.css";
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import {getSession, useSession} from 'next-auth/client'
import {UserRole} from '.prisma/client'
import Link from "next/link";
import Button from "@components/button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const getServerSideProps = async (context) => {
    // Get the user's session based on the request
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: session.userRole === UserRole.User ? "/explore" : "/my-charity",
                permanent: false,
            },
        };
    }
    return {props: {}};
};

export default function Home() {
    const [session, loading] = useSession()

    if (loading) return null

    return (
        <>
            <Head>
                <title>Donarity | Home</title>
            </Head>
            <Layout>
                <section>
                    <PageTitle>Donarity</PageTitle>
                    <h3>Donating made easier</h3>
                </section>
                <br></br>
                <section>
                    <Row>
                        <Col md={6}>
                            <h1>Donating doesn't have to be a hassle</h1>
                            <h2>Make one-off payments or recurring donations to multiple charities, and manage them all
                                in one
                                place.</h2>
                        </Col>
                        <Col md={6}>
                            <img src={"/savemotherearth.svg"} alt="No Image!"/>
                        </Col>
                    </Row>

                    <div className={buttonStyles.donateButtons}>
                        <Button>I'm an organisation</Button>
                        <Button white>I'm a donor</Button>
                    </div>
                </section>
            </Layout>
        </>
    )
}
