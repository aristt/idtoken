
## IdToken

The aim of the project is to create an Ethereum token that can be used and exchanged only between authorized (or identified) parties.
This constraint can be useful for regulatory compliance, in cases where the identification of parties is required in order to perform certain kind of transactions.

The project includes two smart contracts and a Web UI.
- IdToken contract: It inherits all the functionalities of the standard ERC20 and in addition checks that sender and recipient are authorized to transact as described above. In order to perform this check, it queries the IdManager Contract.
- IdManager contract: It provides the public function "verifyAddress(address)" used by the IdToken contract to check whether an address is authorized to perform token transactions.
- IdManager web UI: It can be used to add and remove addresses from the list of ideitified addresses authorized to transact.



### See also
* [Circuit braker](circuit_breaker.md)
* [Contract addresses on Rinkeby](deployed_addresses.txt)
* [Design pattern decisions](design_pattern_decisions.md)
