const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');
let fetchedAccounts;
let inbox;
const initialString = 'Hi there';
// console.log('interface :', interface);
beforeEach(async () => {
  // Get a list of all the accounts
  fetchedAccounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [initialString],
    })
    .send({
      from: fetchedAccounts[0],
      gas: '1000000',
    });
  //use one of the accounts to deploy the contract
  inbox.setProvider(provider);
});
describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('it has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialString);
    console.log('message ', message);
  });
  it('it can change message', async () => {
    await inbox.methods.setMessage('bye').send({
      from: fetchedAccounts[0],
    });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
    console.log('message ', message);
  });
});

// class Car {
//   park() {
//     return 'stopped';
//   }
//   drive() {
//     return 'vroom';
//   }
// }
// let car;
// beforeEach(() => {
//   car = new Car();
// });
// describe('Car', () => {
//   it('car park', () => {
//     assert.equal(car.park(), 'stopped');
//   });
//   it('can drive ', () => {
//     assert.equal(car.drive(), 'vroom');
//   });
// });
//https://rinkeby.infura.io/v3/546bd98b747c4c9ba3990e48a003d2e4
