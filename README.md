# Challenge Payment Transfer - PicPay API in Node.js 

## Description

This challenge came from *devgym* website and it was based in a real
challenge from PicPay, which is a well known payment gateway solution in Brazil.

## Requirements

- Create an endpoint that receives two users ids and a currency value representing the transfer between them.
- Create an endpoint that receives an user id and retrieves his balance.
- Validate if the origin user has enough balance before the transfer. 
- It's needed to think in the possibiilty of having concurrency in the transfers, where two people transfer values at the same time for a third one.
- If a transfer fails, the balance of the origin user should be restored. 
- There's no need for endpoints to create users. Instead, fill the database in a way that two users exists and the tranfers could be done between them.
