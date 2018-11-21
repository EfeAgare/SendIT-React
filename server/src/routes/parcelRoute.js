import express from 'express';
import parcelController from '../controllers/parcelController';
import checkParcelValidation from '../middlewares/checkParcelValidation';
import idValidation from '../middlewares/idValidation';
import Auth from '../middlewares/auth';

const parcelRoute = express();

parcelRoute.route('/parcels')
.get( Auth.verifyToken, parcelController.getAllParcels)
.post(Auth.verifyToken, checkParcelValidation.createParcelValidation,
     parcelController.addParcels);

parcelRoute.route('/parcels/:parcelId')
.get(Auth.verifyToken, idValidation.parcelId, parcelController.getAParcels);

export default parcelRoute;

