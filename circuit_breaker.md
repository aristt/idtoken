## Circuit Braker

The *active* public variable of the IdManager contract is used to implement a circuit braker.

Its value can be set only by the contract owner via the *setActive(status)* function, and when set to false nobody is allow to transact with the token.
