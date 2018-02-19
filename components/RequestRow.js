import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../etherium/web3';
import getCampaign from '../etherium/campaign'

class RequestRow extends React.Component {

  onApprove = async () => {
    const { id, address } = this.props
    try {
      const campaign = getCampaign(address)
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.approveRequest(id).send({ from: accounts[0] })
    } catch (error) {

    }
  }

  onFinalize = async () => {
    const { id, address } = this.props
    try {
      const campaign = getCampaign(address)
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.finalizeRequest(id).send({ from: accounts[0] })
    } catch (error) {

    }
  }

  render() {
    const { Row, Cell } = Table
    const { id, request, approversCount } = this.props
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell><Button onClick={this.onApprove} color="green" basic>Approve</Button></Cell>
        <Cell><Button onClick={this.onFinalize} color="teal" basic>Finalize</Button></Cell>
      </Row>
    )
  }
}

export default RequestRow