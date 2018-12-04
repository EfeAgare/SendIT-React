import express from 'express';
import adminController from '../controllers/adminController';
import idValidation from '../middlewares/idValidation';
import Auth from '../middlewares/auth';

const adminRoute = express();

adminRoute.route('/parcels')
.get( Auth.verifyToken, adminController.getAllParcels);

adminRoute.route('/parcels/:parcelId')
.get(Auth.verifyToken, idValidation.parcelId, adminController.getAParcels);

adminRoute.route('/parcels/:parcelId/status')
.put(Auth.verifyToken, idValidation.parcelId, adminController.changeStatus);

adminRoute.route('/parcels/:parcelId/presentLocation')
.put(Auth.verifyToken, idValidation.parcelId, adminController.presentLocation);


export default adminRoute;

