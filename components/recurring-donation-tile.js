import styles from './recurring-donation-tile.module.css'

import { parseDate } from '../lib/utils'
import { DonationFrequency } from '@prisma/client'
import ArrowLink from './arrow-link'
import Button from './button'
import TextInput from './text-input'
import React from 'react'

export default function RecurringDonationTile({ donation, className, editing, onDelete, changeAmount, key }) {

  const date = parseDate(donation.createdAt);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [amount, setAmount] = React.useState(donation.amount);

  const handleAmountChanged = (newAmount) => {
    if (newAmount != null && newAmount != amount) {
      setAmount(newAmount);
      changeAmount(newAmount);
    }
  }

  return (
    <div key={key} className={styles.tileContainer + (className ? " " + className : "")}>
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
          <ArrowLink right href="#">More info</ArrowLink>
        </div>
      </div>
      {editing && <Button onClick={() => onDelete()} className={styles.bin} icon="/bin.svg"></Button>}
    </div>
  )
}