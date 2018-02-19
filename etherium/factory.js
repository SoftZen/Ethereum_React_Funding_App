import web3 from './web3'
import campaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface), "0x772A157583cfD0345E8d7e44e966f5b8944632F9")

export default instance