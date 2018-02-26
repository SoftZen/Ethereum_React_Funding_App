# Etherеum_React_Funding_App
A simple Kickstarter dapp copy based on Etherеum with ReactJS and NextJS as a front end

You can create Campaigns for funding your idea, receive funding from people who later become your approvers, 
and when you reach your goal you make spending Requests, which must be approved by at least half of your approvers.


# Running the app

Run `npm install` in the main folder

Make sure you install [Metamask](https://metamask.io/) in order to try out the app

## Using the already deployed smart contract in Rinkeby: 

1. Run `npm run dev` and go to `http://localhost:3000/` 

## Using your own contract

1. Go to https://infura.io/signup and create an account
2. Copy the URL next to `Rinkeby	test network`
3. Open `<project_folder>/etherium/deploy.js` and replace my rinkeby URL with yours
4. Use your Metamask account for Rinkeby (or register a new account) by replacing my 12 word mnemonic with yours in `deploy.js`
5. Run `npm run dev` and go to `http://localhost:3000/` (stop the server if it's already running)

## Using Ganache (simulated node)

1. Open `<project_folder>/etherium/deploy.js` and replace 

```
const provider = new HDWalletProvider(
  'task axis silver cover high key know human conduct staff local struggle',
  'https://rinkeby.infura.io/g6L3xFot6mHJr0ms2K1H'
)
const web3 = new Web3(provider)
```

with

```
const ganache = require('ganache-cli')
const provider = ganache.provider()
const web3 = new Web3(provider)
```

2. In your terminal in the main project folder run `ganachle-cli`
3. Compile the solidity files by running `node etherium/compile.js` 
4. Deploy the contracts by running `node etherium/deploy.js` 
5. Run `npm run dev` and go to `http://localhost:3000/`

# Testing

Run `npm test`
