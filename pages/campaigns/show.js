import React from 'react'
import Layout from '../../components/Layout'
import getCampaign from '../../etherium/campaign'
import { Card, Grid, Button } from 'semantic-ui-react'
import { Link } from '../../routes'
import web3 from '../../etherium/web3';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends React.Component {

  static async getInitialProps(props) {
    const address = props.query.address
    const campaign = getCampaign(address)
    const summary = await campaign.methods.getSummary().call()
    return {
      address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    }
  }


  renderCards() {
    const { minimumContribution, balance, requestsCount, approversCount, manager } = this.props
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'Manager created this request and create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(minimumContribution, 'ether'),
        meta: 'Minimum Contribution (ether)',
        description: 'You must contribute at least this much ether in order to become an approver',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw money from the Campaign',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Balance (ether)',
        description: 'Number of people who have already donated to this Campaign',
      }
    ]

    return <Card.Group items={items} />
  }

  render() {
    const { address } = this.props
    return (
      <Layout>
        <h3>CampaignShow</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${address}/requests`}>
                <a>
                  <Button primary>View requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}
export default CampaignShow