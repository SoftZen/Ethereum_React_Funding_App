import React from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import web3 from '../etherium/web3'
import { Router } from '../routes'
import getCampaign from '../etherium/campaign'

class ContributeForm extends React.Component {

  state = {
    contribution: "",
    loading: false,
    error: ""
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const { contribution } = this.state
    const { address } = this.props
    this.setState({ loading: true, error: "" })
    try {
      const accounts = await web3.eth.getAccounts()
      const campaign = getCampaign(address)
      await campaign.methods.contribute().send({ from: accounts[0], value: web3.utils.toWei(contribution, 'ether') })
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (error) {
      this.setState({ loading: false, error: error.message })
    }
  }

  render() {
    const { contribution, loading, error } = this.state
    return (
      <Form onSubmit={this.onSubmit} error={!!error}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label="Ether"
            labelPosition="right"
            value={contribution}
            onChange={event => this.setState({ contribution: event.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={error.split("\n")[0]} />
        <Button loading={loading} primary>Contribute!</Button>
      </Form>
    )
  }
}

export default ContributeForm