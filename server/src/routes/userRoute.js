import express from 'express';
import userController from '../controllers/userController';
import idValidation from '../middlewares/idValidation';

const parseRoute = express();


parseRoute.route('/users/:userId/parcels')
.get(idValidation.userId ,userController.getUserParcel);

parseRoute.route('/users/:userId/:parcelId')
.get(userController.getAUserParcel);

export default parseRoute;

