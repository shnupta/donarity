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
        <Navbar className={styles.navBar} bg="{styles.headerBg}" variant="light" style={{ minWidth: 700 }}>
            <Navbar.Brand className={styles.title} href="#home">Donarity</Navbar.Brand>
            <Nav className="mr-auto links">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Button href="/api/auth/signin" variant="outline-dark">Login</Button>
            <Button variant="outline-dark">Signup</Button>
        </Navbar>
    )
}