import styles from './recurring-donation-tile.module.css'

import { parseDate } from '../lib/utils'
import { DonationFrequency } from '@prisma/client'
import ArrowLink from './arrow-link'
import Button from './button'
import TextInput from './text-input'
import React from 'react'
import Modal from '../components/modal';

export default function RecurringDonationTile({ donation, className, editing, onDelete, changeAmount, netSpending }) {

  const [infoOpen, infoSet] = React.useState(false)

  const date = parseDate(donation.createdAt);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [amount, setAmount] = React.useState(donation.amount);

  const handleAmountChanged = (newAmount) => {
    if (newAmount != null && newAmount != amount) {
      setAmount(newAmount);
      changeAmount(newAmount);
    }
  }

  function openInfoModal() {
    infoSet(true);
  }

  function closeInfoModal() {
      infoSet(false);
  }

  return (
    <div className={styles.tileContainer + (className ? " " + className : "")}>
      <div className={styles.tile}>
        <div className={styles.marginBottom + " " + styles.flex}>
          <h2 className={styles.charityName}>{donation.charity.name}</h2>
          {editing ?
            <TextInput value={donation.amount} icon="/pound.svg" onFocus={() => {}} onChange={handleAmountChanged} className={styles.amountInput} number /> :
            <h2 className={styles.donationAmount}>£{donation.amount}</h2>
          }
        </div>
        <div className={styles.flex}>
          <p className={styles.date}>{date.day}th{donation.frequency === DonationFrequency.Annually ? " " + months[date.month - 1] : ""} of every {donation.frequency === DonationFrequency.Annually ? "year" : "month"}</p>
          <ArrowLink click={openInfoModal} right href="#">More info</ArrowLink>
        </div>
      </div>
      {editing && <Button onClick={() => onDelete()} className={styles.bin} icon="/bin.svg"></Button>}
      <Modal open={infoOpen} onClose={closeInfoModal}>
          <div>
            <div>
              <h1>Donation Details</h1>
            </div>
            <div className={styles.infoMainModal}>
                <img className={styles.charityProfile} src={donation.charity.image}/>
                <div>
                    <h1 className={styles.amountModal}>£{donation.amount}</h1>
                    <h2 className={styles.tansactionFreqModal}>{donation.frequency}</h2>
                </div>
            </div>
            <div>
                <h4 className={styles.charityNameModal}>{donation.charity.name}</h4>          
            </div>
            <div>
              <p style={{marginBottom: "0"}}>Start Date: {date.day} {months[date.month - 1]} {date.year} - {date.hour + ":" + date.minute}</p>
              <p>Accumulated Spending: £{netSpending}</p>
            </div>
          </div>
        </Modal>
    </div>
  )
}