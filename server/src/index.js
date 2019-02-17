import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import expressvalidator from 'express-validator';
import parcelRoute from './routes/parcelRoute';
import adminRoute from './routes/adminRoute';
import userRoute from './routes/userRoute';
import path from 'path';

const port = parseInt(process.env.PORT, 10) || 2000;
const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressvalidator());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Acess-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
// app.use('/', express.static('UI'));
app.get('/api/v1/', (req, res) => {
  res
    .status(200)
    .json(
      'Welcome to SendIt \n SendIT is a courier service that helps users deliver parcels to different destinations.'
    );
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', parcelRoute);
app.use('/api/v1/', adminRoute);
app.use('/api/v1/', userRoute);

//react app
app.use(express.static(path.resolve(__dirname, '../../dist')));

// handling react router, for request to react app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});
app.use((req, res, next) => {
  const error = new Error("We can't find the page you are looking for");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.toString()
    }
  });
});

app.listen(port, () => console.log('server running at port', port));

export default app;
