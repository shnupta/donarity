import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/PageTitle.module.css'
import PageTitle from "../components/page-title";

export default function ProfilePage() {
    return (
        <>
            <Head>
                <title>My Profile</title>
            </Head>
            <Layout>
                <PageTitle>
                    <div className="row m-b-r m-t-3">
                        <div className="col-md-2 offset-md-1">
                            <img src="/test/red-cross.png" alt=""
                                 className="img-circle img-fluid" />
                        </div>
                        <div>
                            <h2>Bella Moraru</h2>
                            <h5>Animal lover!!</h5>
                        </div>
                    </div>
                    <h2 className={styles.subcomponent_title}>£10 monthly donations</h2>
                    <h2 className={styles.subcomponent_title}>Following 8 charities</h2>
                    <h2 className={styles.subcomponent_title}>Interests</h2>
                    <h2 className={styles.subcomponent_title}>Donation History</h2>
                </PageTitle>
            </Layout>
        </>
    )
}
