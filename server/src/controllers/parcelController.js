import { Client} from 'pg';
import { connectionString } from '../config/config';

/**
 * This class handles Parcels Order controllers for users
 * */

class ParcelController {

    /**
     * This method create a new parcel order to the list of Parcels orders
     * @param {object} req - User request object
     * @param {object} res - server response Object
     * @returns {object} success or failure
     */
    static addParcels(req, res) {
        const getuser = `SELECT role FROM users WHERE role = $1 `;
        const text = `INSERT INTO parcels(name, deliveryAddress, deliveryPNumber,pickUpAddress,
                currentLocation, itemDescription,itemWeight, itemQuantity,userId, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *`
        const values = [req.body.name,req.body.deliveryAddress,req.body.deliveryPNumber,
            req.body.pickUpAddress,req.body.pickUpAddress,req.body.itemDescription,
            req.body.itemWeight,req.body.itemQuantity,req.user.id,'awaiting'];
        const client = new Client(connectionString);
        client.connect();
        client.query(getuser, [req.user.role])
        .then ((result) => {
            if (result.rows[0].role === 'user'){
                const client = new Client(connectionString);
                client.connect();
                client.query({text: text, values: values})
                .then((result) => {
                res.status(201).json({
                    message: 'Parcels created successfully',
                    data: result.rows[0]
                });
                client.end()
            })
            .catch((err) => {  res.status(500).json(err.message) 
                client.end()
            });
            }else{ res.status(400).json({message: 'Can\t create parcel' }) }
        }) .catch((err) => {
            res.status(500).json(err.message)
            client.end()})
    }
    /**
     * This method cancel a previous parcel order in the list of Parcels orders
     * @param {object} req - User request object
     * @param {object} res - User response object
     * * @returns {object} success or failure
     */
    static cancelParcel(req, res) {
        const text = 'SELECT status FROM parcels WHERE id = $1';
        const textUpdate = `UPDATE parcels SET status = $1 WHERE id = $2 returning *`;
        const getUser = 'SELECT role FROM users WHERE role = $1';
        const client = new Client(connectionString);
        client.connect();
        client.query(getUser, [req.user.role])
            .then((result) => {
                if (result.rows[0].role === 'user'){
                    const client = new Client(connectionString);
                    client.connect();
                    client.query(text, [parseInt(req.params.parcelId,10)])
                    .then ((result) => {
                        if (!result.rows[0]) {
                            res.status(404).json({ message: "Parcel Not found "});
                        } else if (result.rows[0].status === 'delivered' || result.rows[0].status === 'cancelled') {
                            res.status(400).json({ message: "Parcel No longer valid to be cancelled"});
                        } else {
                            const values = ['cancelled',parseInt(req.params.parcelId,10)];
                            const client = new Client(connectionString);
                            client.connect();
                            client.query(textUpdate, values)
                                .then((result) => {
                                    res.status(200).json({
                                        success: 'true',
                                        message: 'Parcel cancelled successfully',
                                        data: result.rows[0]
                                    });    
                                }).catch((err) => { res.status(500).json({ error: err.message});})
                    }
                               }).catch((err) => {res.status(500).json({ error: err.message});})
            }else{ res.status(403).json('You have no access') }
        }).catch((err) => {res.status(500).json({ error: err.message});})
    }
 
     /**
     * This method changes the destination of a parcel order by users
     * @param {object} req - User request object
     * @param {object} res - User response object
     * * @returns {object} success or failure
     */
    static destination(req, res) {
        const text = `SELECT  deliveryAddress, status FROM parcels WHERE id = $1;`
        const textUpdate = `UPDATE parcels SET deliveryAddress = $1, status =$2  WHERE id= $3 returning *`;
         const getUser = 'SELECT role, id FROM users WHERE role = $1 AND id=$2'
        const client = new Client(connectionString);
        client.connect();
        client.query(getUser, [req.user.role, req.user.id])
            .then((result) => {
                if (result.rows[0].role === 'user'){
                    const client = new Client(connectionString);
                    client.connect();
                    client.query(text, [parseInt(req.params.parcelId,10)])
                    .then ((result) => {
                        if (!result.rows[0]) {
                            res.status(404).json({
                                message: "No valid entry found for provided ID"
                            });
                        } else if (result.rows[0].status === 'delivered' ||result.rows[0].status === 'cancelled') {
                            res.status(400).json({
                                message: "Parcel Destination can no longer be Changed"
                            });
                        } else {
                            const values = [
                                 req.body.deliveryAddress,
                                 'awaiting',
                                 parseInt(req.params.parcelId,10)
                            ];
                            const client = new Client(connectionString);
                            client.connect();
                            client.query(textUpdate, values)
                                .then((result) => {
                                    res.status(200).json({
                                        success: 'true',
                                        message: 'Parcel destination changed successfully',
                                        data: result.rows[0]
                                    });
                                    client.end()
                                }).catch((err) => { res.status(500).json({ error: err.message});})
                    }client.end()
                }).catch((err) => {res.status(500).json({ error: err.message}); client.end()})
            }else{ res.status(403).json({ message:'You have no access' }) }
        }).catch((err) => {res.status(500).json({ error: err.message}); 
        client.end();})
    }
}
export default ParcelController;