const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')

const contract = require('../etherium/build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'task axis silver cover high key know human conduct staff local struggle',
  'https://rinkeby.infura.io/g6L3xFot6mHJr0ms2K1H'
)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(contract.interface))
    .deploy({ data: contract.bytecode })
    .send({ gas: '1000000', from: accounts[0] })
  console.log("interface", contract.interface);
  console.log("Deployed to", result.options.address);
}

deploy()

/*
  Last deployed to:
  0x6F43A8d6279197D9BaC33890c57b396211b0faC3
*/