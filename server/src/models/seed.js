import { Client } from 'pg';
import Helpers from '../controllers/helper';
import { connectionString } from '../config/config'

const hashPassword = Helpers.hashPassword('2010agare');
const textConfirm = `INSERT INTO users (username, email, password, role)
 VALUES($1, $2, $3, $4) `;
const values = ['Knowledge','knowledgeagare157@gmail.com', hashPassword,'admin'];
const client = new Client(connectionString);
client.connect();
client.query(textConfirm, values)
.then((result) => {
      client.end()
  })
  .catch((err) => {
      client.end()}
  );