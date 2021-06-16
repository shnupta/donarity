import Head from 'next/head'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <Layout>
                <PageTitle>About</PageTitle>
                <center>
                    <img src={"/people.svg"} alt="No Image!"/>
                    <h3>A better way to donate.</h3>
                    <p>
                        Donarity allows people to make one-off, recurring and split donations to their favourite
                        charities, and manage them all in one place.
                    </p>
                    <p>
                        This makes the giving process easier and more personalised, allowing organisations to reach more
                        people and raise more funds, so they can achieve their mission. By simplifying the way people
                        donate, we can create more positive change in the world.
                    </p>
                </center>
                <br></br>
                <center>
                    <h2>Where it all started.</h2>
                </center>
                <br></br>
                <Row>
                    <Col md={6}>
                        <img width="480" height="270" src={"/computer.svg"} alt="No Image!"/>
                    </Col>
                    <Col md={6}>
                        <p>Donarity was created as a group software engineering project by 4 Computing students at
                            Imperial College London. For our Designing for Real People project, we wanted to use our
                            technical skills to aid charities. Upon thinking of the ways we could help and doing user
                            research, the question we asked was:</p>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md={6}>
                        <p>"How might we enable charities to reach a wider audience and communicate more effectively
                            with supporters, on a platform that would allow for individuals to manage their donations in
                            one place, discover new charities that align with their values, and see how their donated
                            money is being used?"</p>
                    </Col>
                    <Col md={6}>
                        <img width="480" height="270" src={"/speaker.svg"} alt="No Image!"/>
                    </Col>
                </Row>
                <br></br>
                <center>
                    <h2>One solution. Donarity.</h2>
                </center>
                <Row>
                    <Col md={6}>
                        <p>Donarity lets you keep track of your donations. In a single website, you can see how much
                            money you spend on each charity and divide your money between the many choices of charities
                            we have to offer. You can discover new charities that match your interests and values, and
                            search for charities by category, browsing descriptions, images and posts on charity
                            profiles, in order to find those you’d love to donate to. You can keep up to date with the
                            charities you follow and see the impact of your contributions. You can go onto your feed to
                            see the progress on the projects you have contributed to.</p>
                    </Col>
                    <Col md={6}>
                        <img src={"/bella.svg"} alt="No Image!"/>
                    </Col>
                </Row>
            </Layout>
        </>
    )
}