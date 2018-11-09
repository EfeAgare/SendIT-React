import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import parcelRoute from './routes/parcelRoute'
import userRoute from './routes/userRoute'
import expressvalidator from "express-validator"

const port = parseInt(process.env.PORT, 10) || 2000;
const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressvalidator());


app.use('/api/v1/', parcelRoute);


app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);  
});

app.use((error, req, res, next) => {
    res.status(error.status || 404);
    res.json({
        error:{
            message: error.message
        }
    });
});



app.listen(port, () => console.log('server running at port', port) )

export default app;