import parcels from '../models/parcels';

/**
 * This class handles Parcels Order controllers
 * */

class ParcelController {

    /**
     * This method gets all Parcels
     * @param {array} req - user request array
     * @param {array} res - Server response array
     * @returns {array} success or failure 
     */

    static getAllParcels(req, res) {
        res.status(200).json(parcels);
    }
    /**
     * This method gets a particular Parcels on request
     * @param {object} req - User request object
     * @param {object} res - Server response Object
     * @returns {object} success or failure
     */

    static getAParcels(req, res) {
        const order = parcels.filter(parcel => parcel.id === parseInt(req.params.parcelId));
        console.log(order, '====')
        if (order) {
            res.status(200).json({
                success: 'true',
                message: 'Parcel retrieved successfully',
                order: order
            })
        } else {
            return res.status(404).json({message: 'Parcel not Found'})
        }
    }

    /**
     * This method create a new parcel order to the list of Parcels orders
     * @param {object} req - User request object
     * @param {object} res - server response Object
     * @returns {object} success or failure
     */
    static addParcels(req, res) {
        req.body.id = parcels[parcels.length - 1].id + 1,
        req.body.status = 'waiting'
        parcels.push(req.body);
        return res.status(200).json({
            success: 'true',
            message: "Parcel Order Created Successfully",
            parcel: req.body
        })
    }

     /**
     * This method cancel a previous parcel order in the list of Parcels orders
     * @param {object} req - User request object
     * @param {object} res - User response object
     * * @returns {object} success or failure
     */
    static cancelParcel(req, res, next) {
        let order = parcels.filter(parcel => parcel.id === parseInt(req.params.parcelId));
        
        if (!order[0]) {
            res.status(404).json({
                message: 'Parcel not Found'
            })
        } 
         else {
            const cancelledOrder = { ...order[0],  status: 'cancelled'  }
            return res.status(200).json({
                success: 'true',
                message: 'Parcel Order cancelled successfully',
                data: cancelledOrder
            });   
        }
    }
}

export default ParcelController;