import parcels from '../models/parcels';
import moment from 'moment'

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


 /**
     * This method cancel a previous parcel order in the list of Parcels orders
     * @param {object} req 
     * @param {object} res 
     * @param {object} next
     * @returns {object} request
     */
    static cancelParcel(req, res, next) {

        let id = parseInt(req.params.parcelId, 10);
        const order = parcels.filter(parcel => parcel.id === id);

        if (!order[0]) {
            return res.status(404).json({
                message: 'Parcel not Found'
            })
        } else if (order[0].status === 'delivered' || order[0].status === 'cancel') {
            return res.status(404).json({
                message: 'Parcel cannot be cancelled'
            })
        } else {

            req.check('deliveryAddress.firstName', ' deliveryAddress cannot be empty').equals(req.body.deliveryAddress.firstName)
            req.check('deliveryAddress.lastName', ' deliveryAddress cannot be  empty').equals(req.body.deliveryAddress.lastName)
            req.check('deliveryAddress.streetAddress', ' deliveryAddress cannot be  empty').equals(req.body.deliveryAddress.streetAddress)
            req.check('deliveryAddress.addressCity', ' deliveryAddress cannot be empty').equals(req.body.deliveryAddress.addressCity)
            req.check('deliveryAddress.addressState', ' deliveryAddress cannot be  empty').equals(req.body.deliveryAddress.addressState)
            req.check('expectedArrival.to to be in 24 hrs time', ' expectedArrival cannot be  empty').not().isEmpty().optional({ checkFalsy: true }).isISO8601().equals(req.body.expectedArrival.to)
            req.check('expectedArrival.from', ' expectedArrival time to be in 24 hrs time').not().isEmpty().optional({ checkFalsy: true }).isISO8601().equals(req.body.expectedArrival.from)
            req.check('itemShipped.name', 'itemShipped name cannot be empty').equals(req.body.itemShipped.name)
            req.check('itemShipped.description', 'itemShipped description cannot be empty').equals(req.body.itemShipped.description)
            req.check('email','Enter a vild email address').isEmail().equals(req.body.email);
        req.check('phoneNumber', 'enter a Vild Nigeria Phone numbe').isMobilePhone('en-NG').equals(req.body.phoneNumber)
            req.check('status', 'status Value must Equal cancel').equals('cancel')

            const errors = req.validationErrors();
            if (errors) {
                return res.status(404).json({
                    message: 'There have been some relating to your STATUS INPUT (It must equal Cancel) ',
                    error: errors

                });
            }
            const parcelCancel = {
                id: parseInt(req.params.parcelId, 10),
                deliveryAddress: {
                    firstName: req.body.deliveryAddress.firstName,
                    lastName: req.body.deliveryAddress.lastName,
                    streetAddress: req.body.deliveryAddress.streetAddress,
                    addressCity: req.body.deliveryAddress.addressCity,
                    addressState: req.body.deliveryAddress.addressState
                },
                expectedArrival: {
                    from: moment(req.body.expectedArrival.from).format("YYYY-MM-DD LT","YYYY-MM-DD h:mm:ss A","YYYY-MM-DD HH:mm:ss","YYYY-MM-DD HH:mm"),
                    to: moment(req.body.expectedArrival.to).format("YYYY-MM-DD LT","YYYY-MM-DD h:mm:ss A","YYYY-MM-DD HH:mm:ss","YYYY-MM-DD HH:mm")
                },
                itemShipped: {
                    name: req.body.itemShipped.name,
                    description: req.body.itemShipped.description,
                },
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
                status: req.body.status
            }

            parcels.splice(id, 1, parcelCancel);
            return res.status(200).json({
                success: 'true',
                message: 'Parcel Order canceled successfully',
                parcelCancel,
            })
        }
    }


    /**
     * This method create a new parcel order to the list of Parcels orders
     * @param {object} req 
     * @param {object} res 
     * @param {object} next
     * @returns {object} request
     */
    static cancelParcel(req, res, next) {

        let id = parseInt(req.params.parcelId, 10);
        const order = parcels.filter(parcel => parcel.id === id);

        if (!order[0]) {
            return res.status(404).json({
                message: 'Parcel not Found'
            })
        } else if (order[0].status === 'delivered' || order[0].status === 'cancel') {
            return res.status(404).json({
                message: 'Parcel cannot be cancelled'
            })
        } else {

            req.check('deliveryAddress.firstName', ' deliveryAddress cannot be empty').equals(req.body.deliveryAddress.firstName)
            req.check('deliveryAddress.lastName', ' deliveryAddress cannot be  empty').equals(req.body.deliveryAddress.lastName)
            req.check('deliveryAddress.streetAddress', ' deliveryAddress cannot be  empty').equals(req.body.deliveryAddress.streetAddress)
            req.check('deliveryAddress.addressCity', ' deliveryAddress cannot be empty').equals(req.body.deliveryAddress.addressCity)
            req.check('deliveryAddress.addressState', ' deliveryAddress cannot be  empty').equals(req.body.deliveryAddress.addressState)
            req.check('expectedArrival.to to be in 24 hrs time', ' expectedArrival cannot be  empty').not().isEmpty().optional({ checkFalsy: true }).isISO8601().equals(req.body.expectedArrival.to)
            req.check('expectedArrival.from', ' expectedArrival time to be in 24 hrs time').not().isEmpty().optional({ checkFalsy: true }).isISO8601().equals(req.body.expectedArrival.from)
            req.check('itemShipped.name', 'itemShipped name cannot be empty').equals(req.body.itemShipped.name)
            req.check('itemShipped.description', 'itemShipped description cannot be empty').equals(req.body.itemShipped.description)
            req.check('email','Enter a vild email address').isEmail().equals(req.body.email);
        req.check('phoneNumber', 'enter a Vild Nigeria Phone numbe').isMobilePhone('en-NG').equals(req.body.phoneNumber)
            req.check('status', 'status Value must Equal cancel').equals('cancel')

            const errors = req.validationErrors();
            if (errors) {
                return res.status(404).json({
                    message: 'There have been some relating to your STATUS INPUT (It must equal Cancel) ',
                    error: errors

                });
            }
            const parcelCancel = {
                id: parseInt(req.params.parcelId, 10),
                deliveryAddress: {
                    firstName: req.body.deliveryAddress.firstName,
                    lastName: req.body.deliveryAddress.lastName,
                    streetAddress: req.body.deliveryAddress.streetAddress,
                    addressCity: req.body.deliveryAddress.addressCity,
                    addressState: req.body.deliveryAddress.addressState
                },
                expectedArrival: {
                    from: moment(req.body.expectedArrival.from).format("YYYY-MM-DD LT","YYYY-MM-DD h:mm:ss A","YYYY-MM-DD HH:mm:ss","YYYY-MM-DD HH:mm"),
                    to: moment(req.body.expectedArrival.to).format("YYYY-MM-DD LT","YYYY-MM-DD h:mm:ss A","YYYY-MM-DD HH:mm:ss","YYYY-MM-DD HH:mm")
                },
                itemShipped: {
                    name: req.body.itemShipped.name,
                    description: req.body.itemShipped.description,
                },
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
                status: req.body.status
            }

            parcels.splice(id, 1, parcelCancel);
            return res.status(200).json({
                success: 'true',
                message: 'Parcel Order canceled successfully',
                parcelCancel,
            })
        }
    }

    static addParcels(req, res, next) {

        req.check('deliveryAddress.firstName', ' deliveryAddress cannot be empty').not().isEmpty()
        req.check('deliveryAddress.lastName', ' deliveryAddress cannot be  empty').not().isEmpty()
        req.check('deliveryAddress.streetAddress', ' deliveryAddress cannot be  empty').not().isEmpty()
        req.check('deliveryAddress.addressCity', ' deliveryAddress cannot be empty').not().isEmpty()
        req.check('deliveryAddress.addressState', ' deliveryAddress cannot be  empty').not().isEmpty()
        req.check('expectedArrival.to to be in 24 hrs time', ' expectedArrival cannot be  empty').not().isEmpty().optional({ checkFalsy: true }).isISO8601()
        req.check('expectedArrival.from', ' expectedArrival time to be in 24 hrs time').not().isEmpty().optional({ checkFalsy: true }).isISO8601()
        req.check('itemShipped.name', 'itemShipped name cannot be empty').not().isEmpty()
        req.check('itemShipped.description', 'itemShipped description cannot be empty').not().isEmpty()
        req.check('email','Enter a vild email address').isEmail();
        req.check('phoneNumber', 'enter a Vild Nigeria Phone numbe').isMobilePhone('en-NG')
        

        const errors = req.validationErrors();
        if (errors) {
            return res.status(404).json({
                errors: errors
            });
        }
        
        const newParcel = {
            id: parcels[parcels.length - 1].id + 1,
            deliveryAddress: {
                firstName: req.body.deliveryAddress.firstName,
                lastName: req.body.deliveryAddress.lastName,
                streetAddress: req.body.deliveryAddress.streetAddress,
                addressCity: req.body.deliveryAddress.addressCity,
                addressState: req.body.deliveryAddress.addressState
            },
            expectedArrival: {
                from: moment(req.body.expectedArrival.from).format("YYYY-MM-DD LT","YYYY-MM-DD h:mm:ss A","YYYY-MM-DD HH:mm:ss","YYYY-MM-DD HH:mm"),
                to: moment(req.body.expectedArrival.to).format("YYYY-MM-DD LT","YYYY-MM-DD h:mm:ss A","YYYY-MM-DD HH:mm:ss","YYYY-MM-DD HH:mm")
            },
            itemShipped: {
                name: req.body.itemShipped.name,
                description: req.body.itemShipped.description,
            },
             email:req.body.email,
              phoneNumber:req.body.phoneNumber,
              status: 'awaiting pickup'
        }

        parcels.push(newParcel);
        return res.status(200).json({
            success: 'true',
            message: "Parcel Order Created Successfully",
            parcel: newParcel
        })

    }

      
}

export default ParcelController;