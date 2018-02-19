/* global describe it beforeEach*/
const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)

const compiledFactory = require('../etherium/build/CampaignFactory.json')
const compiledCampaign = require('../etherium/build/Campaign.json')

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })
  // campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface))
  //   .deploy({ data: compiledCampaign.bytecode, arguments: ['100', accounts[0]] })
  //   .send({ from: accounts[0], gas: '1000000' })
  factory.setProvider(provider);
  await factory.methods.createCampaign('1').send({ from: accounts[0], gas: "1000000" })
  const addresses = await factory.methods.getDeployedCampaigns().call()
  campaignAddress = addresses[0]
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress)
  campaign.setProvider(provider);
})

describe('Campaigns', () => {

  it('deploys a factory and a campaign', async () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('marks caller as manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(accounts[0], manager)
  })

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({ from: accounts[1], value: web3.utils.toWei('2', 'ether') })
    // const isContributor = await campaign.methods.approvers(accounts[1]).call()
    // assert(isContributor)
  })

  it('requires minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({ from: accounts[1], value: web3.utils.toWei('0.9', 'ether') })
      assert(false)
    } catch (error) {
      assert.ok(error)
    }
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest('Buy batteries', web3.utils.toWei('1', 'ether'), accounts[1]).send({ from: accounts[0], gas: '1000000' })
    const request = await campaign.methods.requests(0).call()
    assert.equal('Buy batteries', request.description)
  })

  it('process request', async () => {
    let initialBalance = await web3.eth.getBalance(accounts[1])
    initialBalance = web3.utils.fromWei(initialBalance, 'ether')
    initialBalance = parseFloat(initialBalance)

    await campaign.methods.contribute().send({ from: accounts[0], value: web3.utils.toWei('2', 'ether') })

    await campaign.methods.createRequest('Buy batteries', web3.utils.toWei('1', 'ether'), accounts[1]).send({ from: accounts[0], gas: '1000000' })

    await campaign.methods.approveRequest(0).send({ from: accounts[0], gas: '1000000' })

    await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: '1000000' })

    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)

    assert(initialBalance < balance)
  })

})