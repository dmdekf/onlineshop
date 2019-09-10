import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import ShopContract from "./contracts/Shop.json";
import "./App.css";
class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     web3: null,
     shopInstance: null,
     myAccount: null
   };
 }
 componentDidMount() {
   getWeb3()
     .then(results => {
       this.setState({
         web3: results.web3
       });
       this.instantiateContract();
     })
     .catch(() => {
       console.log("Error finding web3.");
     });
 }
 instantiateContract = () => {
   const contract = require("truffle-contract");
   const shop = contract(ShopContract);
   shop.setProvider(this.state.web3.currentProvider);

   this.state.web3.getAccount((error, accounts)=>{
      if(!error) {
        shop.deployed().then(instance =>{
          this.setState({
            shopInstance:instance,
            myAccount:accounts
          })
          this.updateMyApples();
        })
      }
   })
 }

 buyApple =()=>{
  this.state.shopInstance.buyApple({
    from:this.state.myAccount,
    value:this.state.web3.toWei(10,'ether'),
    gas:900000
  })
 }

 sellAplle =()=>{
  this.state.shopInstance.sellMyApple(this.state.web3.toWei(10, "ether"),{
    from:this.state.myAccount,
    gas:900000
  })
 }

 updateMyApples=()=>{
   this.state.shopInstance.getApples().then(result=>{
     this.setState({
       myApples :result.toNumber()
     })
   })
 }

 render() {
   return (
   <div className="App">
     
     <h1>Apple price : 10 ETH</h1>
     <button onClick = {()=>this.buyApple()}>Buy</button>
     <p>My Apple : </p>
     <button onClick = {()=>this.sellAplle()}>Sale price(Sale price : )

     </button>
       
       </div>
   )
 }
}
export default App;