import React from 'react'
import Layout from '../../../components/Layout';
import { Link } from '../../../routes'
import { Button, Table } from 'semantic-ui-react';
import getCampaign from '../../../etherium/campaign'
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends React.Component {

  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = getCampaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()
    const requests = await Promise.all(Array(parseInt(requestCount)).fill().map((r, i) => campaign.methods.requests(i).call()))
    return { address, requests, approversCount }
  }

  renderRows() {
    return this.props.requests.map((r, i) =>
      <RequestRow
        request={r}
        id={i}
        key={i}
        approversCount={this.props.approversCount}
        address={this.props.address} />)
  }

  render() {
    const { address } = this.props
    const { Header, Body, Row, HeaderCell } = Table
    return (
      <Layout>
        <Link route={`/campaigns/${address}/requests/new`}>
          <a>
            <Button primary>Add request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount (Ether)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
      </Layout>
    )
  }
}

export default RequestIndex