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


      /**
     * This method gets a particular Parcels on request
     * @param {object} req 
     * @param {object} res 
     * @param {object} next
     * @returns {object} request
     */

    static getAParcels(req, res, next) {
        const id = parseInt(req.params.parcelId, 10);
        const order = parcels.filter(parcel => parcel.id === id);

        if (order[0]) {
            return res.status(200).json({
                success: 'true',
                message: 'Parcel retrieved successfully',
                order: order

            })
        } else {
            return res.status(404).json({
                message: 'Parcel not Found'

            })

        }
    }

    


  
}

export default ParcelController;