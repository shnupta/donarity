import React from 'react'
import ButtonGroup from './button-group'
import TextInput from './text-input'

const frequency = {
  SINGLE: "Single",
  MONTHLY: "Monthly",
  ANNUALLY: "Annually",
}


class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.state = {
      frequency: 0,
      amount: 0,
      shareInfo: true,
    };
  }

  handleFrequencyChange(frequency) {
    this.setState({
      frequency: frequency,
      amount: this.state.amount,
      shareInfo: this.state.shareInfo
    });
  }

  handleAmountChange(amount) {
    const amountInt = parseInt(amount.substring(1)) // Remove the pound sign and get the integer
    this.setState({
      frequency: this.state.frequency,
      amount: amountInt,
      shareInfo: this.state.shareInfo
    })
  }

  render() {
    return (
      <>
      <ButtonGroup buttons={[frequency.SINGLE, frequency.MONTHLY, frequency.ANNUALLY]} handler={this.handleFrequencyChange} state={this.state} />
      <ButtonGroup buttons={["£5", "£10", "£20", "£50"]} handler={this.handleAmountChange} state={this.state} />
      <TextInput active placeholder="other" number icon="/pound.svg" />
      <a onClick={() => console.log("Freq: " + this.state.frequency + "\nAmount: " + this.state.amount)}>Click to get info</a>
      </>
    )
  }
}

export default PaymentForm;