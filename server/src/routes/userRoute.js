import express from 'express';
import userController from '../controllers/userController'

const parseRoute = express();


parseRoute.route('/users/:userId/parcels')
.get(userController.getUserParcel);



export default parseRoute;

