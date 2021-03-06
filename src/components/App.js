import React, { Component } from 'react';
import daiLogo from '../dailogo.png';
import './App.css';
import Web3 from 'web3';
import DaiTokenMock from '../abis/DaiTokenMock.json';

class App extends Component {

  async componentWillMount () {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-ethereum browser detected. You should consider trying a MetaMask account')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log('this is the first account form the array', accounts[0])
    const firstAccount = accounts[3];
    this.setState({ account: accounts[0]})
    const daiTokenAddress = '0xb9a65b2e18b72dBd7F41B232AB4215B99fC3A819' // replace dai address here
    const daiTokenMock = new web3.eth.Contract(DaiTokenMock.abi, daiTokenAddress)
    this.setState({ daiTokenMock: daiTokenMock })
    console.log('web3', web3)
    console.log('daiTokenAddress', daiTokenAddress)
    console.log('DaiTokenMock.abi', DaiTokenMock.abi)
    console.log('daiTokenMock', daiTokenMock)

    const balance = await daiTokenMock.methods.balanceOf(this.state.account).call();
    console.log('balance ', balance.toString())
    this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether')} )

    // Create transaction history 

    const transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
    console.log(transactions, 'transactions')
    this.setState({ transactions: transactions} )
  }

  transfer(recipient, amount){
    console.log(amount, 'amout')
    this.state.daiTokenMock.methods.transfer(recipient, amount).send( { from: this.state.account})
  }


   

  constructor(props) {
    super(props);
    this.state = {
        account: '',
        daiTokenMock: null, 
        balance: 0,
        transactions: []
     };
     this.transfer = this.transfer.bind(this)
  }


  
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto" style={{ width: "500px" }}>

                <img src={daiLogo} alt="logo of dai coin" />
    
                <h1>{this.state.balance}</h1>
              
                <form onSubmit={(event) => {
                    // TODO: handle submit
                    event.preventDefault()
                    const recipient = this.recipient.value
                    const amount = window.web3.utils.toWei(this.amount.value, 'Ether')
                    console.log(recipient, amount)
                    this.transfer(recipient, amount)
                }}> 
                    <div className="form-group mr-sm-2">
                      <input 
                        id="recipient"
                        type="text"
                        ref={(input) => { this.recipient = input}}
                        className="form-control"
                        placeholder="Recipient Address"
                        required
                      />
                    </div >
                    <div className="form-group mr-sm-2">
                      <input 
                        id="amount"
                        type="text"
                        ref={(input) => { this.recipient = input}}
                        className="form-control"
                        placeholder="Amount"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Send</button>
                </form>
                <table className="table">
                  <thread>
                    <tr>
                      <th scope="col">
                        Recipient
                      </th>
                      <th scope="col">
                        Value
                      </th>
                    </tr>
                  </thread>
                  <tbody>
                    {/* {this.state.transactions.map( (tx, index) => {
                      return (
                      <tr key={index}>
                        <td>{tx.returnValues.to}</td>
                      <td>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</td>
                      </tr>  
                      )
                    })} */}
                  </tbody>
                </table>

               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;