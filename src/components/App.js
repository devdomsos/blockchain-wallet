import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

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
    console.log(accounts)
    this.setState({ account: accounts[0]})
  }

  constructor(props) {
    super(props);
    this.state = { };
  
  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
            
                <h1>Dominik's Starter Kit For Dapps</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;