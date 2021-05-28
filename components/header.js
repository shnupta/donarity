import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import styles from './header.module.css'


// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const [session, loading] = useSession()
    const router = useRouter();
    const path = router.asPath;

    return (
        <>
        <Navbar className={styles.navBar} variant="light" style={{ minWidth: 700 }}>
            <Navbar.Brand className={styles.title} href="/">Donarity</Navbar.Brand>
            <Nav className={styles.links}>
                {!session && (
                <Nav.Link className={styles.navLink} onClick={() => signIn("auth0", { callbackUrl: 'http://localhost:3000/feed' })}>Login / Signup</Nav.Link>
                )}
                {session && (
                <Nav.Link className={styles.navLink} onClick={() => signOut({ callbackUrl: 'http://localhost:3000/'})}>Sign Out</Nav.Link>
                )}
                <Nav.Link className={styles.navLink + (path === "/about" ? " " + styles.active : "")} href="/about">About</Nav.Link>
                <Nav.Link className={styles.navLink + (path === "/charities" ? " " + styles.active : "")} href="/charities">Charities</Nav.Link>
                <Nav.Link className={styles.navLink + (path === "/contact" ? " " + styles.active : "")} href="/contact">Contact Us</Nav.Link>
            </Nav>
        </Navbar>
        <div className={styles.curve}></div>
        </>
    )
}