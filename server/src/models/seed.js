import { Client } from 'pg';
import Helpers from '../controllers/helper';
import { connectionString } from '../config/config'

const hashPassword = Helpers.hashPassword(process.env.ADMIN_PASS);
const textConfirm = `INSERT INTO users(username, lastname, email, password, role) VALUES($1, $2, $3, $4,$5)`;
const values = ['Knowledge','Admin',process.env.ADMIN_EMAIL, hashPassword,'admin'];
const client = new Client(connectionString);
client.connect();
client.query(textConfirm, values)
.then((result) => {
      client.end()
  })
  .catch((err) => {
      client.end()}
  );