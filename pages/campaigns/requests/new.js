import React from 'react'
import Layout from '../../../components/Layout';
import getCampaign from '../../../etherium/campaign'
import { Link, Router } from '../../../routes'
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../../../etherium/web3';

class CreateRequest extends React.Component {

  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }

  state = {
    description: '',
    value: '',
    recipient: '',
    loading: false,
    error: '',
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const { description, value, recipient } = this.state
    this.setState({ loading: true })
    try {
      const accounts = await web3.eth.getAccounts()
      const campaign = getCampaign(this.props.address)
      await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
        from: accounts[0]
      })
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ error: error.message, loading: false })
    }
  }

  render() {
    const { loading, error, description, value, recipient } = this.state
    return (
      <Layout>
        <Form onSubmit={this.onSubmit} error={!!error}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={error.split("\n")[0]} />
          <Button loading={loading} primary>Create!</Button>
        </Form>
      </Layout>
    )
  }
}

export default CreateRequest