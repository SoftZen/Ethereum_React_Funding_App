import React from 'react'
import factory from '../etherium/factory'
import { Card, Button } from 'semantic-ui-react'
import Layout from '../components/Layout';
import { Link } from '../routes'

class CampaignsList extends React.Component {

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns }
  }

  renderCampaigns = () => {
    const { campaigns } = this.props
    let items = []
    if (campaigns) {
      items = campaigns.map(c => ({
        header: c,
        description: (
          <Link route={`/campaigns/${c}`}>
            <a>View campaign</a>
          </Link>
        ),
        fluid: true
      }))
    }
    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content='Create Campaign'
                icon='add circle'
                primary />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }
}

export default CampaignsList