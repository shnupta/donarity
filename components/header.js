import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import styles from './header.module.css'


// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const [session, loading] = useSession()

    return (
        <Navbar className={styles.navBar} variant="light" style={{ minWidth: 700 }}>
            <Navbar.Brand className={styles.title} href="/">Donarity</Navbar.Brand>
            <Nav className="ml-auto links">
                {!session && (
                <Nav.Link onClick={() => signIn("auth0", { callbackUrl: 'http://localhost:3000/feed' })}>Login / Signup</Nav.Link>
                )}
                {session && (
                <Nav.Link onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Sign Out</Nav.Link>
                )}
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/charities">Charities</Nav.Link>
                <Nav.Link href="/contact">Contact Us</Nav.Link>
            </Nav>
        </Navbar>
    )
}