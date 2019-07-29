
# IdToken

The aim of the project is to create an **Ethereum token** that can be used and exchanged only between authorized (or identified) parties.
This constraint can be useful for **regulatory compliance**, in cases where the identification of parties is required in order to perform certain kind of transactions.

The project includes two smart contracts and a Web UI.
- **IdToken contract:** It inherits all the functionalities of the standard ERC20 and in addition checks that sender and recipient are authorized to transact as described above. In order to perform this check, it queries the IdManager Contract.
- **IdManager contract:** It provides the public function *verifyAddress(address)* used by the IdToken contract to check whether an address is authorized to perform token transactions.
- **IdManager web UI:** It can be used to add and remove addresses from the list of ideitified addresses authorized to transact.


## Local setup and test

### Requirements:

* NodeJS version >= 8.11.3
* Truffle
* Ganache or ganache-cli

### Steps:

You can watch a **video** of the following steps at [https://youtu.be/TxID_7hvqEI](https://youtu.be/TxID_7hvqEI)

1. Start ganache or ganache-cli **setting network 5777** *ganache-cli -i 5777* to provide an ethereum test network on your local computer on port 8545. Write down the private key of the first account (at position 0).
2. Clone the project repository and install the dependencies: *npm install*
3. Compile the smart contracts: *truffle compile*
4. Deploy the smart contracts on the local test network: *truffle migrate* and write down the IdToken address.
5. Run the tests *truffle test*
6. Install the **last version** of Chrome Metamask plugin and switch the network to *http://localhost:8545*
7. **Import in metamask the account used to deploy the contracts.** and select it as current account. The private key can be exported from ganache (see step 1).
8. Install the web dependencies: *cd web/id-manager && npm install*
9. Run the web UI: *cd web/id-namager && npm run serve*
10. Open the web UI in the browser (should be http://localhost:8080) and login with (user: admin@idmanager.com password: admin)
11. Configure the IDT token contract in Metamask (Add token => Custom Token => Paste Token address (from step 4) => Next => Add Tokens)
12. Verify that your current account is shown in the web UI. Paste it into the *Ethereum address* input form and click *add*. This operation is needed in order to authorize your address to receive token.
13. Click on the *+1000* button to fund your current account.
14. Use the web UI to add or remove addresses authorized to transact with the token
14. Test IDT token transfers from Metamask. They will succeed if both the sender or the recipient are authorized, and fail otherwise.


## Info for evaluation
* [Circuit braker](circuit_breaker.md)
* [Contract addresses on Rinkeby](deployed_addresses.txt)
* [Design pattern decisions](design_pattern_decisions.md)
* [Avoiding common attacks](avoiding_common_attacks.md)
* The IdToken contract inherits from the ERC20 contract which use SafeMath Library
* The app interface reflects updates to the IdManager contract state when buttons *Add* or *Remove* are pressed.
