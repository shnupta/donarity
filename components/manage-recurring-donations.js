import Button from './button'
import Link from 'next/link'
import styles from './manage-recurring-donations.module.css'
import { DonationFrequency } from '@prisma/client'
import RecurringDonationTile from './recurring-donation-tile'
import React from 'react'

class ManageRecurringDonations extends React.Component {

    constructor(props) {
        super(props);
        this.removeDonation = this.removeDonation.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.state = {
            editing: false,
            recurringDonations: props.donations.filter(donation => donation.frequency != DonationFrequency.Single),
            tempRecurringDonations: props.donations.filter(donation => donation.frequency != DonationFrequency.Single),
        };
    }

    removeDonation(index) {
        const oldDonations = this.state.tempRecurringDonations.slice();
        oldDonations.splice(index, 1);
        this.setState({
            editing: this.state.editing,
            recurringDonations: this.state.recurringDonations,
            tempRecurringDonations: oldDonations
        })
    }

    changeAmount(index, amount) {
        const oldDonations = JSON.parse(JSON.stringify(this.state.tempRecurringDonations));
        oldDonations[index].amount = amount;
        this.setState({
            editing: this.state.editing,
            recurringDonations: this.state.recurringDonations,
            tempRecurringDonations: oldDonations
        })
    }

    toggleEditing() {
        this.setState({
            editing: !this.state.editing,
            recurringDonations: this.state.recurringDonations,
            tempRecurringDonations: this.state.recurringDonations,
        })
    }

    cancel() {
        this.setState({
            editing: false,
            recurringDonations: this.state.recurringDonations,
            tempRecurringDonations: this.state.recurringDonations,
        })
    }

    save() {
        this.setState({
            editing: false,
            recurringDonations: this.state.tempRecurringDonations,
            tempRecurringDonations: this.state.tempRecurringDonations,
        })
    }

    render() {

        const recurringDonationTiles = () => {
            if (this.state.recurringDonations.length === 0) {
                return <p>Currently no recurring donations</p>
            }
            return this.state.tempRecurringDonations.map((donation, key) => 
                <RecurringDonationTile key={key}
                                       editing={this.state.editing}
                                       className={styles.recurringDonationTile}
                                       donation={donation}
                                       onDelete={() => {this.removeDonation(key)}}
                                       changeAmount={(amount) => {this.changeAmount(key, amount)}}/>);
        }

        return (
            <>
                <div className={styles.recurringTitle}>
                    <h1>Recurring Donations</h1>
                    {this.state.recurringDonations.length > 0 && <Button onClick={() => {this.toggleEditing()}} icon="/edit.svg"></Button>}
                </div>
                { recurringDonationTiles() }
                {this.state.editing &&
                    <div className={styles.save}>
                        <Button onClick={this.save}>Save</Button>
                        <Button white onClick={this.cancel}>Cancel</Button>
                    </div>
                }
                <Link href={"/explore"}>
                    <Button>Explore more charities</Button>
                </Link>
            </>
        )
    }
}

export default ManageRecurringDonations;