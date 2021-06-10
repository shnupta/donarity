import styles from './recurring-donation-tile.module.css'

import { parseDate } from '../lib/utils'
import { DonationFrequency } from '@prisma/client'
import ArrowLink from '../components/arrow-link'

export default function RecurringDonationTile({ donation, className }) {

  const date = parseDate(donation.createdAt);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return (
    <div className={styles.tile + (className ? " " + className : "")}>
      <div className={styles.marginBottom}>
        <h2 className={styles.charityName}>{donation.charity.name}</h2>
        <h2 className={styles.donationAmount}>£{donation.amount}</h2>
      </div>
      <div>
        <p className={styles.date}>{date.day}th{donation.frequency === DonationFrequency.Annually ? " " + months[date.month - 1] : ""} of every {donation.frequency === DonationFrequency.Annually ? "year" : "month"}</p>
        <ArrowLink right href="#">More info</ArrowLink>
      </div>
    </div>
  )
}