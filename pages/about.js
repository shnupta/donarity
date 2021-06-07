import Head from 'next/head'
import Layout from '../components/layout'

export default function AboutPage() {
    return (
        <>
        <Head>
            <title>About</title>
        </Head>
        <Layout>
            <h1>About</h1>
            <h3>Donarity. A place for making donating easier.</h3>
            <p>
                Donarity was created as a group software engineering project by 4 Computing students at Imperial
                College London. For our Designing for Real People project, we wanted to use our technical skills
                to aid charities. Upon thinking of the ways we could help and doing user research, the question
                we asked was:
            </p>
            <p>
                "How might we enable charities to reach a wider audience and communicate more effectively with
                supporters, on a platform that would allow for individuals to manage their donations in one
                place, discover new charities that align with their values, and see how their donated money is
                being used?"
            </p>
            <p>
                This is where Donarity comes in. Donarity lets you keep track of your donations. In a
                single website, you can see how much money you spend on each charity and divide your money
                between the many choices of charities we have to offer. You can discover new charities that
                match your interests and values, and search for charities by category, browsing descriptions,
                images and posts on charity profiles, in order to find those you’d love to donate to. You can
                keep up to date with the charities you follow and see the impact of your contributions. You
                can go onto your feed to see the progress on the projects you have contributed to.
            </p>
        </Layout>
        </>
    )
}