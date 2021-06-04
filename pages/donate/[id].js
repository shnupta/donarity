import { PrismaClient } from '@prisma/client'
import Layout from '../../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'
import Container from 'react-bootstrap/Container'
import styles from '../../styles/Donate.module.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

export const getServerSideProps = async (context) => {
    const prisma = new PrismaClient()
    // Find the model in prisma/schema.prisma
    const charity = await prisma.charity.findUnique({
        where: {
            id: context.params.id,
        }
    })

    // TODO: Check if found if not throw 404 page

    return { props: { charity } }
  }

export default function DonatePage({ charity }) {
    const [session, loading] = useSession()

    return (
        <Layout>
            <Row className={styles.main_container}>
                <Col className={styles.column}>
                    <h1>{charity.name}</h1>
                    <img src={charity.image} />
                    <p style={{padding:'1em 0'}}>{charity.description}</p>
                </Col>
            </Row>
            <Row className={styles.main_container}>
                <Col className={styles.column}>
                    <h1>New Donation</h1>
                    <ButtonGroup className={styles.frequency}>
                        <Button>Single</Button>
                        <Button>Monthly</Button>
                        <Button>Yearly</Button>
                    </ButtonGroup>
                    <ButtonGroup className={styles.frequency}>
                        <Button>£5</Button>
                        <Button>£10</Button>
                        <Button>£20</Button>
                    </ButtonGroup><br></br>
                    <Button className={styles.donate}>Proceed To Payment</Button>
                </Col>
            </Row>
            <Row className={styles.main_container}>
                <Col className={styles.column}>
                <h1 style={{padding:'5px 0'}}>OR</h1>
                </Col>
            </Row>
            <Row className={styles.main_container}>
                <Col className={styles.column}>
                <Button className={styles.donate}>Add To Split Donations</Button>
                </Col>
            </Row>
        </Layout>
    )
}