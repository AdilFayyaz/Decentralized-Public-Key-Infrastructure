"use strict";
import "./App.css"
import React, {Component} from 'react';
import Web3 from 'web3'
import {SIMP_STORAGE_ADDRESS, SIMP_STORAGE_ABI} from './config.js'
import * as cryp from 'crypto';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Wave from "react-wavify";
import {Col, Row, Stack} from "react-bootstrap";
class App extends Component {

  constructor() {
    super()
    this.state = { msg2:"",msg:"",err:"",err2:"", ca:"",petitions:"",account: '', simpcontract:'', allData: '', value:'', signature:'', r:'', s:'', v:'', v_dec:0, publicKey: '', privateKey: ''}
  }
  componentDidMount() {
    this.loadBlockchainData()
  }
  async loadBlockchainData() {
    const web3 = new Web3("HTTP://127.0.0.1:7545")
    const simpstorage = new web3.eth.Contract(SIMP_STORAGE_ABI,SIMP_STORAGE_ADDRESS);
    this.setState({ simpcontract: simpstorage })
    var crypto = require('crypto');

    var prime_length = 232;
    var diffHell = crypto.createDiffieHellman(prime_length);

    diffHell.generateKeys('hex');
    console.log("Public Key : " ,diffHell.getPublicKey('hex'));
    console.log("Private Key : " ,diffHell.getPrivateKey('hex'));
    // this.state.publicKey = diffHell.getPublicKey('hex');
    this.setState({publicKey: diffHell.getPublicKey('hex'),
      privateKey: diffHell.getPrivateKey('hex')
    })
    console.log(this.state.publicKey);
      
  }
  async sign (web3, text, addr){
    await web3.eth.sign('0x'+this.toHex(text),addr).then(result=>{this.setState({
      signature:result.substr(2)
    })})
    this.state.r=this.state.signature.slice(0,64)
    this.state.s=this.state.signature.slice(64,128)
    this.state.v=this.state.signature.slice(128,130)
    //this.state.v_dec=web3.utils.toDecimal(this.state.v)
    console.log(this.state.signature)
    console.log(this.state.r)
    console.log(this.state.s)
    console.log(this.state.v_dec)

  }
  async getDomainData(domainName, simpstorage){
    const value = await simpstorage.methods.getDomainData(domainName).call()
    const val=this.parseDomainData(value.toString())
    this.setState({ value: val})
  }
  async getCAData( simpstorage){
    const value = await simpstorage.methods.getCAs().call()
    const val = this.parseList(value.toString())
    this.setState({ ca: val })
  }
  async getmsg( ){
    this.setState({ msg: "Vote Casted"})
  }
  parseList(str){
    var str2 = ''
    for(var i=0;i<str.length;i++) {
      if (str[i]==",") {
        str2 += "\n"
      }
      else{
        str2 += str[i]
      }
    }
    return str2
  }
  parsePetitionList(str){
    // return str
    var str2=""
    var x= str.split(",")
    for(var i=0;i<x.length;i++){

        str2+="\npetitioner: "
        str2+=x[i]

        str2+=", time: "
        str2+=x[i+1]

        str2+=", votes: "
        str2+=x[i+2]
        str2+="\n"
        i+=parseInt(x[i+2])
      if (parseInt(x[i+2])==0){i++}
      i+=2
        i++
        str2+="\n"

    }
      return str2;

  }
  parseDomainData(str){
    // return str
    var str2=""
    var x= str.split(",")
    for(var i=0;i<x.length;i++) {
      if (i % 12 == 0) {
        str2 += "\nDomain Name: "
        str2 += x[i]
      } else if (i % 12 == 1) {
        str2 += "\nOrganization Name: "
        str2 += x[i]
      } else if (i % 12 == 2) {
        str2 += "\nCountry: "
        str2 += x[i]
      } else if (i % 12 == 3) {
          str2 += "\nState: "
          str2 += x[i]
        } else if (i % 12 == 4) {
        str2 += "\nEmail: "
        str2 += x[i]
      } else if (i % 12 == 5) {
        str2 += "\nPublic key: "
        str2 += x[i]
      } else if (i % 12 == 6) {
        str2 += "\nDays Valid: "
        str2 += x[i]
      }else if (i % 12 == 7) {
        str2 += "\nDate created: "
        var d=Date(parseInt(x[i])*1000)
        str2 += d.toString()
      }else if (i % 12 == 8) {
        str2 += "\nRevoke Count: "
        str2 += x[i]
      }else if (i % 12 == 9) {
        str2 += "\nValid: "
        str2 += x[i]
      }else if (i % 12 == 11) {
        break
      }else{
        str2 += "\n"
      }

   }

    return str2;

  }
  async getPetitionData( simpstorage){
    const val = await simpstorage.methods.viewPetitions().call()
    const val2=this.parsePetitionList(val.toString())
    this.setState({ petitions:val2   })
  }
  toHex(str) {
    var hex = ''
    for(var i=0;i<str.length;i++) {
     hex += ''+str.charCodeAt(i).toString(16)
    }
    return hex
   }
  handleSubmit(e){
    e.preventDefault();
    e.target.reset();
  }

  render() {
    return (
        <div className="App">
        <div className="App-header">
      <div className="bg-card" style={{borderRadius:"4rem"}}>

          {/*<div className="image">*/}
          <img className="image" src="./image.jpg" style={{borderRadius: '90rem',width:"20rem",height:"20rem"}}/>
          {/*</div>*/}
          {/*<div className="tabs">*/}
            <Tabs className="tabs">
              <TabList style={{}}>
                <Tab>Register Domain</Tab>
                <Tab>Domain Details</Tab>
                <Tab>Update Public Key</Tab>
                <Tab>Register CA</Tab>
                <Tab>View Petitions</Tab>
                <Tab>Vote</Tab>
                <Tab>Revoke</Tab>
                <Tab>Update Days</Tab>
              </TabList>

              <TabPanel style={{}}>

                <div>
                  <h1> Welcome Certified Authority </h1>
                  <p>Public Key: {this.state.publicKey}</p>
                  <p>Enter Your Account Address: </p>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const accNum = new FormData(event.target).get("accountNum");
                    this.setState({account:accNum})
                    this.handleSubmit(event)
                  }}>
                    <input id="acnum" name="accountNum" type="text" placeholder='Account Address' required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                    <input type="submit" hidden="" value="Use Address" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
                  </form>
                  <p>Using Account at Address: {this.state.account}</p>
                  <p>REGISTER A DOMAIN: Enter the following details:</p>

                  <form onSubmit={(event) => {
                    event.preventDefault()

                    const domainName = new FormData(event.target).get("domainName");
                    const org = new FormData(event.target).get('orgName');
                    const country = new FormData(event.target).get('countryName');
                    const state = new FormData(event.target).get('stateName');
                    const email = new FormData(event.target).get('emailAddr');
                    const pubKey = new FormData(event.target).get('pubKey');
                    const daysValid = new FormData(event.target).get('daysValid');

                    this.state.simpcontract.methods.registerDomain(domainName,org,country,state,email,
                        pubKey,daysValid).send({ from: this.state.account, gas:900000 }).catch((error) => {
                        alert('Error Occured')})
                    this.loadBlockchainData()
                    this.handleSubmit(event)
                  }} >
                    <input id="domain" name ="domainName" type="text" placeholder="Domain Name" required style={{borderRadius:"1rem",background:"#ffffff"}} />
                    <input id="org" name ="orgName" type="text" placeholder= "Organization Name" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                    <input id="country" name ="countryName" type="text" placeholder="Country Name" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                    <input id="state" name ="stateName" type="text" placeholder= "State Name" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                    <input id="email" name ="emailAddr" type="text" placeholder="Email Address" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                    <input id="pubkey" name ="pubKey" type="text" placeholder= "Public Key" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                    <input id="daysValid" name ="daysValid" type="text" placeholder= "Days Valid"required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                    <input type="submit" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
                  </form>
                </div>
              </TabPanel>
              <TabPanel style={{}}>
                <div>
                  <p>To get Domain Details:</p>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const domainName = new FormData(event.target).get("getName");
                    this.getDomainData(domainName, this.state.simpcontract)
                    this.loadBlockchainData()
                    console.log("here")
                    console.log(this.state.value)

                  }}>
                    <input type="text" id="getName" name="getName" placeholder="Domain Name"required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                    <input type="submit" hidden="" value="Get" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
                  </form>
                  <p style={{whiteSpace: 'pre-wrap'}}>{this.state.value}</p>
                </div>
                <div style={{marginTop:"20rem"}}></div>
              </TabPanel>
              <TabPanel style={{}}>
                <div>
                  <p>To Update Public Key:</p>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const pubKey = new FormData(event.target).get("address");
                    const domainName = new FormData(event.target).get("domainName");
                   
                    this.state.simpcontract.methods.updatePublicKey(domainName,pubKey).send({ from: this.state.account })
                    .catch((err)=>{alert("Error Updating Public Key")})
                    this.loadBlockchainData()
                    this.handleSubmit(event)
                  }}>
                    <input type="text" id="address" name="address" placeholder="New Public Key"required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                    <input type="text" id="domainName" name="domainName" placeholder="Your Domain Name"required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                    
                    <input type="submit" hidden="" value="Sign and Update" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
                  </form>
                  {/* <p>{this.state.value}</p> */}
                </div>
                <div style={{marginTop:"18rem"}}></div>
              </TabPanel>
              
              <TabPanel style={{}}>
                <div>
                  <p>Register as CA:</p>
                  <p>Using Account at Address: {this.state.account}</p>
                  <p>click to submit petition:</p>

                  <form onSubmit={(event) => {
                    event.preventDefault()

                    const domainName = new FormData(event.target).get("domainName");
                    const org = new FormData(event.target).get('orgName');
                    const country = new FormData(event.target).get('countryName');
                    const state = new FormData(event.target).get('stateName');
                    const email = new FormData(event.target).get('emailAddr');
                    const pubKey = new FormData(event.target).get('pubKey');
                    const daysValid = new FormData(event.target).get('daysValid');
                    this.setState({ err:"Done!"})
                    this.state.simpcontract.methods.submitCAPetition().send({ from: this.state.account, gas:900000 }).catch((error) => {
                      alert('You cant submit a petition')})
                    ;

                    this.loadBlockchainData()
                    this.handleSubmit(event)
                  }} >
                    <input type="submit" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
                  </form>
                  <p>{this.state.err}</p>
                  {/*see petitions*/}

                </div>
              </TabPanel>
              <TabPanel style={{}}>
                <div>
                  <p>view all petitions:</p>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    this.getPetitionData(this.state.simpcontract)


                  }}>
                    <input type="submit" hidden="" value="view petitions" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
                  </form>
                  <text style={{whiteSpace: 'pre-wrap'}}>{this.state.petitions}</text>
                </div>

              </TabPanel>
              <TabPanel style={{}}>
                {/*{this.setState({ msg:" "})}*/}

                <div>
                  <p>Vote for a Petition:</p>
                  <p>Using Account at Address: {this.state.account}</p>

                  <form onSubmit={(event) => {
                    event.preventDefault()

                    const addr = new FormData(event.target).get("addr");

                    this.state.simpcontract.methods.vote(addr).send({ from: this.state.account, gas:900000 }).catch((error) =>{
                      alert("Unable to vote")
                    });
                    this.getmsg()
                  }} >
                    <input id="addr" name ="addr" type="text" placeholder="enter address" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                    <input type="submit" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
                  </form>
                  <p>{this.state.msg}</p>
                  {/*see CAs*/}
                  <div>
                    <p>view all CAs:</p>
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      this.getCAData(this.state.simpcontract)


                    }}>
                      <input type="submit" hidden="" value="view all CAs" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
                    </form>
                    <p>{this.state.ca}</p>
                  </div>

                </div>
              </TabPanel>
              <TabPanel style={{}}>
                <div>
                  <p>Revoke a Domain:</p>
                  <p>Using Account at Address: {this.state.account}</p>

                  <form onSubmit={(event) => {
                    event.preventDefault()

                    const addr = new FormData(event.target).get("addr");

                    this.state.simpcontract.methods.revokeDomain(addr).send({ from: this.state.account, gas:900000 }).catch((err) =>
                    {
                      alert("Unable to revoke Domain");
                    });
                    this.setState({ msg2:"Done!"})

                  }} >
                    <input id="addr" name ="addr" type="text" placeholder="Enter Domain Name" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                    <input type="submit" value="Revoke" hidden=""  style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}} />
                  </form>
                  <p>{this.state.msg2}</p>
                </div>
              </TabPanel>
              <TabPanel style={{}}>
                <div>
                  <p>To Update Domain Valid Days:</p>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const days = new FormData(event.target).get("days");
                    const domainName = new FormData(event.target).get("domainName");
                   
                    this.state.simpcontract.methods.updateDaysOfContract(domainName,days).send({ from: this.state.account })
                    .catch((err)=>{alert("Error Updating Days")})
                    this.loadBlockchainData()
                    this.handleSubmit(event)
                  }}>
                    <input type="text" id="days" name="days" placeholder="New Days"required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                    <input type="text" id="domainName" name="domainName" placeholder="Your Domain Name"required style={{borderRadius:"1rem",background:"#ffffff"}}/>
                    
                    <input type="submit" hidden="" value="Sign and Update" style={{width:"8rem",borderRadius:"1rem",background:"#52D2EF",marginLeft:"1rem"}}/>
                  </form>
                  {/* <p>{this.state.value}</p> */}
                </div>
                <div style={{marginTop:"18rem"}}></div>
              </TabPanel>
            </Tabs>
          {/*</div>*/}


{/* <row style={{}}></row>
       <Wave fill='#8961F3'
      paused={false}
            options={{
              top:'0px',
                bottom:'100px',
                height: 5,
                amplitude: 18,
                speed: 0.7,
                points: 4
              }}
        /> */}

      </div>



        </div>
          </div>

    );
  }
}
export default App;