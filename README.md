[![Build Status](https://travis-ci.com/EfeAgare/SendIT.svg?branch=develop)](https://travis-ci.com/EfeAgare/SendIT)
[![Coverage Status](https://coveralls.io/repos/github/EfeAgare/SendIT/badge.svg?branch=develop)](https://coveralls.io/github/EfeAgare/SendIT?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8cfea949850e7e1e820d/maintainability)](https://codeclimate.com/github/EfeAgare/SendIT/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8cfea949850e7e1e820d/test_coverage)](https://codeclimate.com/github/EfeAgare/SendIT/test_coverage)
# SendIT
SendIT is a courier service that helps users deliver parcels to different destinations.

## How it works 
* Users can:
    * Create a parcel delivery order
    * Get all parcel delivery orders
    * Get a specific parcel delivery order
    * Cancel a parcel delivery order
    
## Technologies
  * Nodejs(ES6)
  * Git
  * NPM
  * Express
  * Babel

## Linting Library
  * Eslint
  
## Installation
  Ensure you have the technologies installed then you can clone this repository with the URL from the <code> clone or download button on this page </code> using <code> git clone *cloned url copied* </code> in your local machine. Afterwards, run <code> npm install </code>  and run  <code> npm run devstart </code>  for a quick start. Or you may build first, using <code> npm run build </code> then run <code> npm start </code>.
If you only want to access the completed work, you will find the link to the hosted work at the bottom of this readme, you don't have to clone this repository!

## Test
  Mocha is the testing framework together with chai assertion library
  * You can run test after installation using <code> npm run test </code>   

<h3>ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>HTTP Request</th>
      <th>End Point</th>
      <th>Functionality</th>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/parcels</td>
      <td>Fetch all parcel delivery orders</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/parcels/:parcelId</td>
      <td>Fetch a specific parcel delivery order</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/:userId/parcels</td>
      <td>Fetch all parcel delivery orders by a specific user</td>
  </tr>
   <tr>
      <td>PUT</td>
      <td>/api/v1/parcels/:parcelId/cancel</td>
      <td>Cancel the specific parcel delivery order</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/parcels</td>
      <td>Create a parcel delivery order</td>
  </tr>
</table>
<br/>
<hr>

You can access the app here https://efe-sendit.herokuapp.com/api/v1/parcels/
