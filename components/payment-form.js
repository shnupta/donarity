import React from 'react'
import ButtonGroup from './button-group'
import Button from './button'
import TextInput from './text-input'
import { DonationFrequency } from '@prisma/client'
import styles from './payment-form.module.css'

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handlePresetAmountChange = this.handlePresetAmountChange.bind(this);
    this.handleCustomAmountChange = this.handleCustomAmountChange.bind(this);
    this.handleData = this.handleData.bind(this);
    this.state = {
      frequency: DonationFrequency.Single,
      amount: 5,
      customAmount: false,
      shareInfo: true
    };
  }

  handleFrequencyChange(frequency) {
    this.setState({
      frequency: frequency,
      amount: this.state.amount,
      customAmount: this.state.customAmount,
      shareInfo: this.state.shareInfo
    });
  }

  handlePresetAmountChange(amount) {
    const amountInt = parseInt(amount.substring(1)); // Remove the pound sign and get the integer
    this.setState({
      frequency: this.state.frequency,
      amount: amountInt,
      customAmount: false,
      shareInfo: this.state.shareInfo
    })
  }

  handleCustomAmountChange(amount) {
    this.setState({
      frequency: this.state.frequency,
      amount: amount,
      customAmount: true,
      shareInfo: this.state.shareInfo
    })
  }

  // Collect the data from the form and pass it to the parent handler()
  handleData() {
    const data = {
      frequency: this.state.frequency,
      amount: this.state.amount,
    }
    this.props.handler(data);
  }

  render() {
    return (
      <>
      <div className={styles.buttonSection}>
        <ButtonGroup buttons={[DonationFrequency.Single, DonationFrequency.Monthly, DonationFrequency.Annually]} handler={this.handleFrequencyChange} state={this.state} active={true} />
      </div>
      <div className={styles.amountSection + " " + styles.buttonSection}>
        <ButtonGroup buttons={["£5", "£10", "£20", "£50"]} handler={this.handlePresetAmountChange} state={this.state} className={styles.amountButtons} active={!this.state.customAmount} />
        <div className={styles.break}></div>
        <TextInput active placeholder="other" number icon="/pound.svg" handler={this.handleCustomAmountChange} active={this.state.customAmount} />
      </div>
      <Button className={styles.payButton} onClick={this.handleData}>Proceed to payment</Button>
      </>
    )
  }
}

export default PaymentForm;