import express from 'express';
import parcelController from '../controllers/parcelController'

const parseRoute = express();

parseRoute.route('/parcels')
.get(parcelController.getAllParcels);

export default parseRoute;