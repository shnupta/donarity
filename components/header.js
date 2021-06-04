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
    const base_url = process.env.NEXT_PUBLIC_BASE_URL

    return (
        <>
            <Navbar className={styles.navBar} expand="lg" variant="light">
                {loading && null}
                {!session && (
                <Navbar.Brand className={styles.title} href="/">Donarity</Navbar.Brand>
                )}
                {session && (
                <Navbar.Brand className={styles.title} href="/explore">Donarity</Navbar.Brand>
                )}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className={styles.links}>
                    {!session && (
                        <>
                            <Nav.Link className={styles.navLink} onClick={() => signIn("auth0", { callbackUrl: base_url + '/explore' })}>Login / Signup</Nav.Link>
                            <Nav.Link className={styles.navLink + (path === "/about" ? " " + styles.active : "")} href="/about">About</Nav.Link>
                            <Nav.Link className={styles.navLink + (path === "/charities" ? " " + styles.active : "")} href="/charities">Charities</Nav.Link>
                            <Nav.Link className={styles.navLink + (path === "/contact" ? " " + styles.active : "")} href="/contact">Contact Us</Nav.Link>
                            <Nav.Link className={styles.navLink + (path === "/contact" ? " " + styles.active : "")} href="/contact">Hello</Nav.Link>
                        </>
                    )}
                    {session && (
                        <>
                            <Nav.Link className={styles.navLink + (path === "/explore" ? " " + styles.active : "")} href="/explore">Explore</Nav.Link>
                            <Nav.Link className={styles.navLink + (path === "/manage" ? " " + styles.active : "")} href="/manage">Manage Donations</Nav.Link>
                            <Nav.Link className={styles.navLink} onClick={() => signOut({ callbackUrl: base_url })}>Sign Out</Nav.Link>
                        </>
                    )}
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className={styles.curve}></div>
        </>
    )
}
