import Layout from '../../components/layout'
import { useSession } from 'next-auth/client'
import styles from '../../styles/Donate.module.css'
import Button from 'react-bootstrap/Button'
import CharitySummary from '../../components/charity-summary'
import PaymentForm from '../../components/payment-form'
import prisma from '../../lib/prisma'

export const getServerSideProps = async (context) => {
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
            <CharitySummary className={styles.summary} charity={charity} />
            <h1>New Donation</h1>

            <PaymentForm />
            
            <Button className={styles.donate}>Proceed To Payment</Button>
            <h1 style={{padding:'5px 0'}}>OR</h1>
            <Button className={styles.donate}>Add To Split Donations</Button>
        </Layout>
    )
}