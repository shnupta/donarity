import Button from "./button";
import Link from "next/link";
import styles from "./manage-recurring-donations.module.css";
import { DonationFrequency } from "@prisma/client";
import RecurringDonationTile from "./recurring-donation-tile";
import React, { setState } from "react";
import Modal from '../components/modal';

class ManageRecurringDonations extends React.Component {

  constructor(props) {
    super(props);
    this.removeDonation = this.removeDonation.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    
    this.state = {
      confirm: false,
      editing: false,
      recurringDonations: props.subscriptions.filter(
        (donation) => donation.frequency != DonationFrequency.Single
      ),
      tempRecurringDonations: props.subscriptions.filter(
        (donation) => donation.frequency != DonationFrequency.Single
      ),
      donationsToRemove: [],
      donationsToUpdate: new Map(),
    };

    this.openConfirm = this.openConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
  }

  openConfirm() {
    this.setState({confirm: true});
  }

  closeConfirm() {
    this.setState({confirm: false});
  }

  async deleteSubscriptions() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscriptions`,
      {
        method: "DELETE",
        body: JSON.stringify(this.state.donationsToRemove),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      console.error(response.statusText);
      return;
    }
  }

  async updateSubscriptions() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscriptions`,
      {
        method: "PUT",
        body: JSON.stringify(Array.from(this.state.donationsToUpdate.entries())),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      console.error(response.statusText);
      return;
    }
  }

  async removeDonation(index) {
    const oldDonations = this.state.tempRecurringDonations.slice();
    const donationToRemove = oldDonations[index];
    oldDonations.splice(index, 1);

    this.state.donationsToRemove.push(donationToRemove);

    this.setState({
      editing: this.state.editing,
      recurringDonations: this.state.recurringDonations,
      tempRecurringDonations: oldDonations,
    });
  }

  changeAmount(index, amount) {
    const oldDonations = JSON.parse(
      JSON.stringify(this.state.tempRecurringDonations)
    );
    oldDonations[index].amount = amount;
    const oldMap = this.state.donationsToUpdate
    oldMap.set(oldDonations[index].subscriptionId, oldDonations[index])
    this.setState({
      editing: this.state.editing,
      recurringDonations: this.state.recurringDonations,
      tempRecurringDonations: oldDonations,
      donationsToUpdate: oldMap,
    });
  }

  toggleEditing() {
    this.setState({
      editing: !this.state.editing,
      recurringDonations: this.state.recurringDonations,
      tempRecurringDonations: this.state.recurringDonations,
      donationsToRemove: [],
      donationsToUpdate: new Map(),
    });
  }

  cancel() {
    this.setState({
      editing: false,
      recurringDonations: this.state.recurringDonations,
      tempRecurringDonations: this.state.recurringDonations,
      donationsToRemove: [],
      donationsToUpdate: new Map(),
    });
  }

  async save() {
    await this.deleteSubscriptions();
    await this.updateSubscriptions();
    this.setState({
      editing: false,
      recurringDonations: this.state.tempRecurringDonations,
      tempRecurringDonations: this.state.tempRecurringDonations,
      donationsToRemove: [],
      donationsToUpdate: [],
    });
    await this.closeConfirm();
    
  }

  render() {
    const recurringDonationTiles = () => {
      if (this.state.recurringDonations.length === 0) {
        return <p>Currently no recurring donations</p>;
      }
      return this.state.tempRecurringDonations.map((donation, key) => (
        <RecurringDonationTile
          key={key}
          editing={this.state.editing}
          className={styles.recurringDonationTile}
          donation={donation}
          onDelete={() => {
            this.removeDonation(key);
          }}
          changeAmount={(amount) => {
            this.changeAmount(key, amount);
          }}
        />
      ));
    };

    return (
      <>
        <div className={styles.recurringTitle}>
          <h1>Recurring Donations</h1>
          {this.state.recurringDonations.length > 0 && (
            <Button
              onClick={() => {
                this.toggleEditing();
              }}
              icon="/edit.svg"
            ></Button>
          )}
        </div>
        {recurringDonationTiles()}
        {this.state.editing && (
          <div className={styles.save}>
            <Button onClick={this.openConfirm}>Save</Button>
            <Button white onClick={this.cancel}>
              Cancel
            </Button>
          </div>
        )}
        <Link href={"/explore"}>
          <a>
            <Button>Explore more charities</Button>
          </a>
        </Link>
        <Modal open={this.state.confirm} onClose={this.closeConfirm}>
          <div className={styles.confirmParent}>
            <div>
              <h1>Are you sure?</h1>
            </div>
            <div>
            <Button onClick={this.save} className={styles.confirmYes}>Yes</Button>
            <Button onClick={this.closeConfirm} className={styles.confirmNo}>No</Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ManageRecurringDonations;
