import Head from 'next/head'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import ContactTile from "@components/contact-tile";
import React from "react";

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact Us</title>
            </Head>
            <Layout>
                <PageTitle>Contact Us</PageTitle>
                <ContactTile
                    img=""
                    charityPage=""
                    height="300px"
                    horizontal
                >
                    <h1>General Enquiries</h1>
                    <h4>For any enquiries you have, please e-mail or call us on</h4>
                    <h4>hello@donarity.co.uk</h4>
                    <h4>+447896541235</h4>
                </ContactTile>
                <br></br>
                <ContactTile
                    img=""
                    charityPage=""
                    height="300px"
                    horizontal
                >
                    <h1>Charities</h1>
                    <h4>If you want your establishment to be represented on Donarity, please e-mail or call us on</h4>
                    <h4>charityrelations@donarity.co.uk</h4>
                    <h4>+449874563210</h4>
                </ContactTile>
            </Layout>
        </>
    )
}