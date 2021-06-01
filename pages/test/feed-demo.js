import Head from 'next/head'
import FeedTile from '../../components/feed/feed-tile'
import Layout from '../../components/layout'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/FeedDemo.module.css'

export default function ComponentDemos() {
    return (
    <>
    <Head>
        <title>Welcome to your feed</title>
    </Head>
    <Layout>
            <section className={styles.component_title}>
                <h1 style={{fontSize: '60px'}}>Your Feed</h1>
            </section>
        <Row>
            <Col sm={3} style={{paddingLeft:'5rem', paddingRight:'1rem'}}>
                <section className={styles.subscriptions}>
                <h1>Your Charities</h1>
                <ul>
                    <li><a href="#">UNICEF</a></li>
                    <li><a href="#">Save The Children</a></li>
                    <li><a href="#">Cancer Research UK</a></li>
                    <li><a href="#">Battersea Dogs And Cats</a></li>
                    <li><a href="#">The Tressel Trust</a></li>
                <li>Team Margot</li>
                </ul>
                </section>
            </Col>
            <Col sm={6}>
                <FeedTile title="Dogs Trust" img="https://marketingweek.imgix.net/content/uploads/2013/11/dogs-trust-paws-2013-460.jpeg?auto=compress,format&q=60&w=460&h=341">
                    <p>Our mission is to bring about the day when all dogs can enjoy a happy life, free from the threat of unnecessary destruction</p>
                </FeedTile>
                <FeedTile title="Stop The Traffik" img="http://www.egc.manchester.ac.uk/workplaceethics/volunteering-opportunities/stt2.jpg">
                    <p>Help to stop human trafficking! It's really bad to society so please help</p>
                </FeedTile>
                <FeedTile title="Battersea Dogs And Cats" img="https://cdn.londonandpartners.com/asset/battersea-dogs-and-cats-home-a73191ad4bd6941d0f20db57f11cbe5b.jpg">
                    <p>Come and meet the cats at our shelter because we really need more volunteers</p>
                </FeedTile>
                <FeedTile title="Save The Children" img="https://www.un.org/sites/un2.un.org/files/styles/large-article-image-style-16-9/public/field/image/un0381303.jpg?itok=SaL3L4vb">
                    <p>We are the first organization to offer supporters the opportunity to sponsor an individual child in the U.S. and around the world</p>    
                </FeedTile>
                <FeedTile title="UNICEF" img="https://media-exp1.licdn.com/dms/image/C4D1BAQHAudgheTPiCg/company-background_10000/0/1561033462970?e=2159024400&v=beta&t=1xVZoM6axp8DFNlpoQHgkcHQVJo9rI2RA762VBpfrJ8">
                    <p>Come join in us in our newest program! Every little donation helps these children in Africa get the education they deserve</p>
                </FeedTile>
                <FeedTile title="Cancer Research UK" img="https://london.ac.uk/sites/default/files/styles/promo_mobile/public/2017-11/ICR-campus.jpg?itok=RRZMof4r">
                    <p>If you have a degree in a Biological domain, why not join the team at Cancer Research UK?</p>
                </FeedTile>
                <FeedTile title="Amnesty International" img="https://aineupstrmediaprd.blob.core.windows.net/media/1923/2006_web.jpg?preset=fixed_1472_42">
                    <p>We want society to be better, but we need your money first</p>
                </FeedTile>
                <FeedTile title="Cat Protection Society" img="https://www.cats.org.uk/media/4044/ginger-kitten.png?width=600">
                    <p>Meet Benji! He is only 2 months old and he is dire need of a home</p>
                </FeedTile>
                <FeedTile title="World Wide Fund For Nature" img="https://tempusmagazine.co.uk/news_images/0511872648.jpg">
                    <p>Come and join our talk today about Pandas! You will be shocked to find out how integral they are to our ecosystem</p>
                </FeedTile>
                <FeedTile title="The Climate Coalition" img="https://dmdlnu87i51n1.cloudfront.net/v1/uk/ckfgv97f8000b3g5jrsajlg0q/0x0:1600x1067/undefinedxundefined/327_in_lb_the_gcc_02_rt.jpg">
                    <p>We have uploaded an article discusing and highlighting how gaming PCs are a major contributor to global warming, especially with the rise of the newest NVIDIA graphics processing cards</p>
                </FeedTile>
                    <section style={{ display: 'flex', justifyContent: 'flex-end' }}>
                     <Button className={styles.button}>Click To See More</Button>
                    </section>
            </Col>
            <Col sm={3}>
            </Col>
        </Row>
    </Layout>
    </>
    )
}