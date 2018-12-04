import express from 'express';
import parcelController from '../controllers/parcelController';
import checkParcelValidation from '../middlewares/checkParcelValidation';
import idValidation from '../middlewares/idValidation';
import Auth from '../middlewares/auth';

const parcelRoute = express();

parcelRoute.route('/parcels')
.post(Auth.verifyToken, checkParcelValidation.createParcelValidation,
     parcelController.addParcels);

parcelRoute.route('/parcels/:parcelId/cancel')
.put(Auth.verifyToken, idValidation.parcelId, parcelController.cancelParcel);

parcelRoute.route('/parcels/:parcelId/destination')
.put(Auth.verifyToken, idValidation.parcelId, parcelController.destination);

export default parcelRoute;

