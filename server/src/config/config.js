import dotenv from 'dotenv';

dotenv.config();
export const config = {
  development: {
    conString: process.env.DATABASE_URL_DEV
  },
  test:
  {
    conString: process.env.DATABASE_URL_TEST
  },
};
let setConnectionString;
const environment = process.env.NODE_ENV || 'development';
if (environment === 'production') setConnectionString = { 
    connectionString: process.env.DATABASE_URL, ssl: true };
else setConnectionString = config[environment].conString;
export const connectionString = setConnectionString;
// 