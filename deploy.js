const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
// console.log('interface ', interface);

const provider = new HDWalletProvider(
  'announce advance camp side curtain consider sick black innocent joy certain crowd',
  'https://rinkeby.infura.io/v3/546bd98b747c4c9ba3990e48a003d2e4',
);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attemping to deploye fom account ,', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!'],
    })
    .send({gas: '1000000', from: accounts[0]});

  console.log('contact deployed to  result', result.options.address);
};
deploy();

//new monic 123

//announce advance camp side curtain consider sick black innocent joy certain crowd

//rink be contract address

//0xFEFC4A56D85a39FE2F4A78Bc47356f11C2458A99
