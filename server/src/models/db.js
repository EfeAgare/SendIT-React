import { Client } from 'pg';
import 'dotenv/config';
import { connectionString } from '../config/config';


const createUserTable = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(20) NOT NULL, 
    email varchar(100) NOT NULL, 
    password varchar(100) NOT NULL,
    role varchar(7));`;
const createParcelTable =
`CREATE TABLE parcels (
    id SERIAL PRIMARY KEY,
    name varchar(20) NOT NULL,
    deliveryAddress varchar(100) NOT NULL,
    deliveryPNumber varchar(20) NOT NULL,
    pickUpAddress varchar(100) NOT NULL,
    currentLocation varChar(40),
    itemDescription varchar(250) NOT NULL,
    itemWeight REAL NOT NULL,
    itemQuantity INT NOT NULL,
    status varchar(20),
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ); `
const makeQuery = (query) => {
  const client = new Client(connectionString);
  client.connect();
  client.query(query)
    .then((res) => {
      
        client.end()
    })
    .catch((err) => {
        
        client.end()}
    );
};


makeQuery(`DROP TABLE IF EXISTS parcels; DROP TABLE IF EXISTS users;${createUserTable}${createParcelTable}`);