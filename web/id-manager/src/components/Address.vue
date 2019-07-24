<template>
<div class="address">

  <b-container>
    <br>
    <b-row>
      <b-col class="col-md-6 offset-md-3">
        <h2>Authorized Members</h2>
        <br>
        <b-form>
          <b-form-group id="addressGroup" label="Ethereum address:" label-for="addressInput">
            <b-form-input id="addressInput" type="text" v-model="address" @change="checkAddr()" required placeholder="0x" />
            <b-form-invalid-feedback :state="!this.msg.address">
              {{msg.address}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>

        <div>
          <b-button pill v-on:click="verifyAddress" class="mr-3">Verify</b-button>
          <b-button pill variant="primary" v-on:click="addMember" class="mr-3">Add</b-button>
          <b-button pill variant="danger" v-on:click="removeMember">Remove</b-button>
        </div>

        <br>
        <br>
        <div>
          <b-alert v-model="metamaskLocked" variant="danger">
            Metamask is locked, please unlock.
          </b-alert>
        </div>
        <div>
          <b-alert v-model="metamaskNotFound" variant="danger">
            Metamask plugin not found, please install.
          </b-alert>
        </div>
        <div>
          <b-alert v-model="showResult" variant="info" dismissible>
            {{ result }}
          </b-alert>
        </div>
        <div>
          <b-alert v-model="accountNotAuthorized" variant="warning">
            The account selected in Metamask is not the owner of the Identity Manager contract. Please select the correct account in order to manage the authorized members.
          </b-alert>
        </div>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>


<script>
/* global web3, ethereum */ // eslint will ignore the undefined variable
// import Web3 from 'web3';
import * as IdManager from '../../../../build/contracts/IdManager.json';
const abi = IdManager.abi;
const contractAddress = IdManager.networks['5777'].address;
var instance;

export default {
  name: 'Address',
  data() {
    return {
      address: "",
      showAlert: true,
      metamaskNotFound: false,
      metamaskLocked: false,
      showResult: false,
      accountNotAuthorized: false,
      result: '',
      msg: {
        address: ''
      }
    }
  },
  methods: {
    verifyAddress() {
      instance.verifyAddress(this.address, (err, res) => {
        if (err) console.log('ERR: ' + err)
        console.log('verifyAddress: ' + res);
        if (res) {
          this.result = 'The address ' + this.address + ' is authorized.'
        } else {
          this.result = 'The address ' + this.address + ' is not authorized.'
        }
        this.showResult = true
      })
    },
    checkAddr() {
      if (!web3.isAddress(this.address) && this.address) {
        this.msg.address = 'Invalid ethereum address'
      } else {
        this.msg.address = ''
      }
    },
    addMember() {
      instance.addMember(this.address, function(err, res) {
        if (err) console.log('ERR: ' + err)
        console.log('verifyAddress: ' + res);
      })
    },
    removeMember() {
      instance.removeMember(this.address, function(err, res) {
        if (err) console.log('ERR: ' + err)
        console.log('verifyAddress: ' + res);
      })
    }
  },

  created: function() {
    if (typeof web3 !== 'undefined') {
      console.log('MetaMask is installed')

      // console.log(JSON.stringify(abi));
      // console.log(contractAddress);
      ethereum.enable() // needed when the browser is in privacy mode
      // w3 = new Web3(Web3.givenProvider); // use an updated version of web3js. Not working!

      // web3 = new Web3(web3.currentProvider);

      console.log('acc0: ' + web3.eth.accounts[0])
      console.log('accd: ' + web3.eth.defaultAccount)
      console.log('web3 api version: ' + web3.version.api)

      instance = web3.eth.contract(abi).at(contractAddress);

      web3.currentProvider.publicConfigStore.on('update', function(res) {
        if (!res.isUnlocked && !this.metamaskNotFound) {
          console.log('aaa')
          this.metamaskLocked = true;
        } else {
          this.metamaskLocked = false;
        }
        this.metamaskNotFound = false;
        // account = res.selectedAddress;
        console.log('UPDATE');
        console.log(res);
        instance.owner({
          from: res.selectedAddress
        }, (err, owner) => {
          if (err) console.log('ERR: ' + err)
          console.log('owner: ' + owner);
          console.log('res.selectedAddress: ' + res.selectedAddress);
          console.log('metamaskNotFound: ' + this.metamaskNotFound);
          console.log('accountNotAuthorized: ' + this.accountNotAuthorized);
          // owner = res;
          if (!this.metamaskNotFound && res.selectedAddress !== owner) {
            this.accountNotAuthorized = true;
          } else {
            this.accountNotAuthorized = false;
          }
        })
      });

    } else {
      console.log('MetaMask is not installed')
      this.metamaskNotFound = true;
    }
  }
}
</script>
