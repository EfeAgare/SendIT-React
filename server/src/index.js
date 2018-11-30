import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import expressvalidator from 'express-validator';
import parcelRoute from './routes/parcelRoute';
import userRoute from './routes/userRoute';


const port = parseInt(process.env.PORT, 10) || 2000;
const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressvalidator());

app.get('/api/v1/', (req, res) =>{
    res.status(200).json('Welcome to SendIt \n SendIT is a courier service that helps users deliver parcels to different destinations.') 
});

app.use('/api/v1/', parcelRoute);
app.use('/api/v1/', userRoute);

app.use((req, res, next) => {
    const error = new Error('We can\'t find the page you are looking for')
    error.status = 404;
    next(error)
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.toString()
        }
    });
});

app.listen(port, () => console.log('server running at port', port) )

export default app;