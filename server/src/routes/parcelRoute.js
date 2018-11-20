import express from 'express';
import parcelController from '../controllers/parcelController';
import checkParcelValidation from '../middlewares/checkParcelValidation';
import idValidation from '../middlewares/idValidation';

const parcelRoute = express();

parcelRoute.route('/parcels')
.get(parcelController.getAllParcels)
.post(checkParcelValidation.createParcelValidation,
     parcelController.addParcels);

parcelRoute.route('/parcels/:parcelId')
.get(idValidation.parcelId, parcelController.getAParcels);

parcelRoute.route('/parcels/:parcelId/cancel')
.put(idValidation.parcelId, parcelController.cancelParcel);

export default parcelRoute;

