import express from 'express';
import parcelController from '../controllers/parcelController';
import checkParcelValidation from '../middlewares/checkParcelValidation';
import idValidation from '../middlewares/idValidation';
import Auth from '../middlewares/auth';

const parcelRoute = express();

parcelRoute
  .route('/parcels')
  .post(
    Auth.verifyToken,
    checkParcelValidation.createParcelValidation,
    parcelController.addParcels
  );

parcelRoute
  .route('/parcels/:parcelId/cancel')
  .patch(Auth.verifyToken, idValidation.parcelId, parcelController.cancelParcel);

parcelRoute
  .route('/parcels/:parcelId/destination')
  .patch(
    Auth.verifyToken,
    idValidation.parcelId,
    checkParcelValidation.deliveryAddress,
    parcelController.destination
  );

export default parcelRoute;
