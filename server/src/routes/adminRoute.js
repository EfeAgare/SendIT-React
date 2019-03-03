import express from 'express';
import adminController from '../controllers/adminController';
import idValidation from '../middlewares/idValidation';
import Auth from '../middlewares/auth';
import checkParcelValidation from '../middlewares/checkParcelValidation';

const adminRoute = express();

adminRoute
  .route('/parcels')
  .get(Auth.verifyToken, adminController.getAllParcels);

adminRoute
  .route('/parcels/:parcelId')
  .get(Auth.verifyToken, idValidation.parcelId, adminController.getAParcels);

adminRoute
  .route('/parcels/:parcelId/status')
  .patch(
    Auth.verifyToken,
    checkParcelValidation.status,
    idValidation.parcelId,
    adminController.changeStatus
  );

adminRoute
  .route('/parcels/:parcelId/currentLocation')
  .patch(
    Auth.verifyToken,
    idValidation.parcelId,
    checkParcelValidation.currentLocation,
    adminController.presentLocation
  );

export default adminRoute;
