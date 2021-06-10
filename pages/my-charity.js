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
import TextArea from '@components/text-area';
import TextInput from '@components/text-input';

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
      <Button className={styles.settings} icon="/settings.svg" onClick={openSettings}>Settings</Button>
      <ExtendedCharitySummary charity={charity} />
      <Button icon="/edit.svg" onClick={openEditSummary}>Edit Summary</Button>
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
      <Button icon="/edit.svg" onClick={openEditInfo}>Edit Additional Info</Button>
      
      <Modal open={settingsOpen} onClose={closeSettings}>
        <h1>Settings</h1>
        <p>Manage your settings!!</p>
      </Modal>

      <Modal className={styles.modal} open={editSummaryOpen} onClose={closeEditSummary}>
        <h1>Edit Summary</h1>
        <label>Tagline</label>
        <TextArea handler={(text) => {}} maxChars={100} className={styles.tagline}>{charity.tagline}</TextArea>
        <label>Description</label>
        <TextArea handler={(text) => {}} maxChars={600} className={styles.description}>{charity.description}</TextArea>
        <label>Website URL</label>
        <TextInput className={styles.smallInput} handler={(text) => {}}>{charity.website}</TextInput>
        <label>Facebook URL</label>
        <TextInput className={styles.smallInput} handler={(text) => {}}>{charity.facebook}</TextInput>
        <label>Twitter URL</label>
        <TextInput className={styles.smallInput} handler={(text) => {}}>{charity.twitter}</TextInput>
        <label>Instagram URL</label>
        <TextInput className={styles.smallInput} handler={(text) => {}}>{charity.instagram}</TextInput>
        <label>LinkedIn URL</label>
        <TextInput className={styles.smallInput} handler={(text) => {}}>{charity.linkedin}</TextInput>
        <Button className={styles.button}>Save</Button>
        <Button className={styles.button} white onClick={closeEditSummary}>Cancel</Button>
      </Modal>

      <Modal open={editInfoOpen} onClose={closeEditInfo}>
        <h1>Edit Info</h1>
        <p>Edit your info!!</p>
      </Modal>
    </Layout>
  )
}