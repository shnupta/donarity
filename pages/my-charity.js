import { UserRole } from '.prisma/client';
import prisma from 'lib/prisma';
import { hasSession, userSession } from 'lib/session';
import Layout from '../components/layout'
import ExtendedCharitySummary from '../components/extended-charity-summary'
import Button from '../components/button'
import ArrowLink from '../components/arrow-link'
import CharityInfo from '../components/charity-info'
import Link from 'next/link'
import Modal from '../components/modal'
import React from 'react'

import styles from '../styles/MyCharity.module.css'

export const getServerSideProps = async ({ req, res }) => {
    // Get the user's session based on the request
    const session = await userSession(req);
  
    if (!hasSession(session)) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else if (session.userRole === UserRole.User) {
      return {
        redirect: {
          destination: "/explore",
          permanent: false,
        },
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      }
    })

    const charity = await prisma.charity.findUnique({
      where: {
        id: user.charityId,
      },
      include: {
        category: true,
        city: {
          include: {
            country: true,
          },
        },
        links: true,
      },
    });
  
    return { props: { charity } };
  };

export default function MyCharityPage({ charity }) {

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [editSummaryOpen, setEditSummaryOpen] = React.useState(false);
  const [editInfoOpen, setEditInfoOpen] = React.useState(false);

  function openSettings() {
    setSettingsOpen(true);
  }

  function closeSettings() {
    setSettingsOpen(false);
  }

  function openEditSummary() {
    setEditSummaryOpen(true);
  }

  function closeEditSummary() {
    setEditSummaryOpen(false);
  }

  function openEditInfo() {
    setEditInfoOpen(true);
  }

  function closeEditInfo() {
    setEditInfoOpen(false);
  }

  return (
    <Layout headerImg={charity.image}>
      <ExtendedCharitySummary charity={charity} />
      <div className={styles.donateButtons}>
        <Link href={"/donate/" + charity.id}>
          <Button>Donate</Button>
        </Link>
        <Button white>Add to split donation</Button>
      </div>
      <div className={styles.extraInfo}>
        <CharityInfo charity={charity} />
        {charity.links.length && 
        <div>
          <h2>Featured Links:</h2>
          {charity.links.map((link) => {
            return <ArrowLink href={link.url}>{link.text}</ArrowLink>
          })}
        </div>
        }
      </div>
      <button onClick={openSettings}>Open settings</button>
      <button onClick={openEditSummary}>Open edit summary</button>
      <button onClick={openEditInfo}>Open edit info</button>
      
      <Modal open={settingsOpen} onClose={closeSettings}>
        <h1>Settings</h1>
        <p>Manage your settings!!</p>
      </Modal>

      <Modal open={editSummaryOpen} onClose={closeEditSummary}>
        <h1>Edit Summary</h1>
        <p>Edit your summary!!</p>
      </Modal>

      <Modal open={editInfoOpen} onClose={closeEditInfo}>
        <h1>Edit Info</h1>
        <p>Edit your info!!</p>
      </Modal>
    </Layout>
  )
}