

## Re-entracy Attacks

The call from the IdToken contract to the external (IdManager) contract is done only via a the **view** function *IdToken._checkAuthorized*.
In this way the caller is guaranteed that the called contract can not modify the state.


## Denial of Service by Block Gas Limit

No loops are included in the contracts' code
