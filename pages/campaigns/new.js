import React from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../etherium/factory'
import web3 from '../../etherium/web3'
import { Router } from '../../routes'

class CampaignNew extends React.Component {

  state = {
    minimumContribution: "",
    loading: false,
    error: ""
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createCampaign(web3.utils.toWei(this.state.minimumContribution, 'ether')).send({ from: accounts[0] })
      Router.pushRoute('/')
    } catch (error) {
      this.setState({ loading: false, error: error.message })
    }
  }

  render() {
    const { minimumContribution, loading, error } = this.state
    return (
      <Layout>
        <h3>Create a Campaign!</h3>

        <Form onSubmit={this.onSubmit} error={!!error}>
          <Form.Field>
            <label>Minimum contribution</label>
            <Input
              label="Ether"
              labelPosition="right"
              value={minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={error.split("\n")[0]} />
          <Button loading={loading} primary>Create!</Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew