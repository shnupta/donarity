import { PrismaClient } from '@prisma/client'
import Layout from '../../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'

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
            <h1>{charity.name}</h1>
            <img src={charity.image} />
        </Layout>
    )
}