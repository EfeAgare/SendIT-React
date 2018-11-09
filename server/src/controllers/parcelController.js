import parcels from '../models/parcels';

/**
 * This class handles Parcels Order controllers
 * */

class ParcelController {

    /**
     * This method gets all Parcels
     * @param {array} req 
     * @param {array} res 
     * @param {object} next
     * @returns {array} request 
     */

    static getAllParcels(req, res, next) {
        res.status(200).json(parcels)
    }
  
}

export default ParcelController;