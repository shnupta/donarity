import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArrowLink from './arrow-link'
import { DonationFrequency } from '@prisma/client'
import { parseDate } from '../lib/utils'

import styles from './history-tile.module.css'

export default function HistoryTile({ donation }) {
    const date = parseDate(donation.createdAt);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <>
        <div className={styles.tile}>
            <div className={styles.row}>
                <Col className={styles.price} md={2}><h2>£{donation.amount}</h2></Col>
                <Col className={styles.name} md={5}>
                    <h2>{donation.charity.name}</h2>
                    { donation.frequency 
                        != DonationFrequency.Single ? (<span className={styles.freq}>({donation.frequency})</span>) : ""}
                </Col>
                <Col className={styles.alignRight} md={3}>
                    <p className={styles.date}>{date.day} {months[date.month - 1]} {date.year}</p>
                </Col>
                <Col className={styles.alignRight} md={2}><ArrowLink right href="#">Details</ArrowLink></Col>
            </div>
        </div>
        </>
    )
}