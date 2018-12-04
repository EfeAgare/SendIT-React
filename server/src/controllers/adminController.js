import { Client} from 'pg';
import { connectionString } from '../config/config';
import emailLocation from './emailLocation';
import emailStatus from './emailStatus';

/**
 * This class handles Parcels Order controllers for admin
 * */

class AdminController {

    /**
     * This method gets all Parcels for Admin
     * @param {array} req - Admin request array
     * @param {array} res - Server response array
     * @returns {array} success or failure 
     */
    static getAllParcels(req, res) {
        const text = `SELECT * FROM parcels`;
        const getuser = `SELECT role FROM users WHERE role =$1 `;
        const client = new Client(connectionString);
        client.connect();
        client.query(getuser, [req.user.role])
            .then((result) => {
                if (result.rows[0].role === 'admin') {
                    const client = new Client(connectionString);
                    client.connect();
                    client.query(text)
                        .then((result) => {
                            res.status(200).json({
                                success: 'true',
                                message: 'Parcels retrieved successfully',
                                data: result.rows
                            });
                            client.end()
                        }).catch((err) => {
                            res.status(404).json({message: 'Parcels not Found' });
                            client.end()
                        });
                } else{ res.status(403).json('You have no access')}
            }).catch((err) => {
                res.status(500).json(err.message)
            })
    }

    /**
     * This method gets a particular Parcels on request for Admin
     * @param {object} req - User request object
     * @param {object} res - Server response Object
     * @returns {object} success or failure
     */
    static getAParcels(req, res) {
        const text = 'SELECT * FROM parcels WHERE id = $1 ';
        const getuser = `SELECT role FROM users WHERE role =$1 `;
        const client = new Client(connectionString);
        client.connect();
        client.query(getuser, [req.user.role])
        .then((result) => {
            if (result.rows[0].role === 'admin'){
               const client = new Client(connectionString);
               client.connect();
               client.query(text, [parseInt(req.params.parcelId, 10)])
                .then((result) => {
                    if (result.rows[0]) {
                            res.status(200).json({
                                success: 'true',
                                message: 'Parcel retrieved successfully',
                                data: result.rows[0]
                            });
                        }else {
                        res.status(404).json({message: "No valid entry found for provided ID"});
                    }client.end()
                }).catch((err) => {
                    res.status(500).json({error: err.message});
                    client.end()
                });
            }else{ res.status(403).json('You have no access') }
        }).catch((err) => { res.status(500).json({ error: err.message}); 
                client.end()
        });
    }    
    /**
     * This method changes the present location of a parcel order in the list of Parcels orders
     * @param {object} req - User request object
     * @param {object} res - User response object
     * * @returns {object} success or failure
     */
    static presentLocation(req, res) {
        let getUserId;
        let parcelResponse;
        const text = 'SELECT currentLocation FROM parcels WHERE id = $1';
        const textUpdate = `UPDATE parcels SET currentLocation = $1
         WHERE id = $2 returning *`;
        const getAdmin = 'SELECT role FROM users WHERE id = $1';
        const getUserEmail = 'SELECT email FROM users WHERE id = $1';
        const client = new Client(connectionString);
        client.connect();
        client.query(getAdmin, [req.user.id])
            .then((result) => {
                if (result.rows[0].role === 'admin'){
                    const client = new Client(connectionString);
                    client.connect();
                    client.query(text, [parseInt(req.params.parcelId,10)])
                    .then ((result) => {
                        if (!result.rows[0]) {
                            res.status(404).json({message: "No Parcel found for provided ID"});
                        } 
                        else {
                            const values = [
                                req.body.currentLocation,
                                parseInt(req.params.parcelId,10)
                            ];
                            const client = new Client(connectionString);
                            client.connect();
                            client.query(textUpdate, values)
                                .then((result) => {
                                    parcelResponse = result.rows[0];
                                    getUserId= result.rows[0].userid ; 
                                    return Promise.all([parcelResponse, getUserId])     
                                })
                                .then(([parcelResponse,getUserId])=>{
                                    const client = new Client(connectionString);
                                    client.connect();
                                    client.query(getUserEmail, [getUserId])
                                    .then((result2) =>{
                                    emailLocation(result2.rows[0].email)
                                     res.status(200).json({
                                            success: 'true',
                                            message: 'Parcel Location Updated successfully  and Email sent successfully',
                                            data: parcelResponse
                                        });
                                 })
                                }).catch((err) => { res.status(500).json({ error: err.message});
                                })
                    }
                    client.end()  }).catch((err) => {res.status(500).json({ error: err.message});
                    client.end()      })
            }else{ res.status(403).json('You have no access')} client.end()
        }).catch((err) => {res.status(500).json({ error: err.message}); client.end()})
    }

    /**
     * This method changes the status of a parcel delivery order by the Admin
     * @param {object} req - User request object
     * @param {object} res - User response object
     * * @returns {object} success or failure
     */
    static changeStatus(req, res) {
        let getUserId;
        let parcelResponse;
        const text = 'SELECT status FROM parcels WHERE id = $1';
        const textUpdate = `UPDATE parcels SET status = $1
         WHERE id = $2 returning *`;
         const getAdmin = 'SELECT role FROM users WHERE id = $1';
        const getUserEmail = 'SELECT email FROM users WHERE id = $1';
        const client = new Client(connectionString);
        client.connect();
        client.query(getAdmin, [req.user.id])
            .then((result) => {
                if (result.rows[0].role === 'admin'){
                    const client = new Client(connectionString);
                    client.connect();
                    client.query(text, [parseInt(req.params.parcelId,10)])
                    .then ((result) => {
                        if (!result.rows[0]) {
                            res.status(404).json({message: "No Parcel found for provided ID"});
                        } else if (result.rows[0].status === 'delivered' || result.rows[0].status === 'cancelled') {
                            res.status(400).json({message: "Parcel No longer valid to be cancelled"});
                        } else {
                            const values = [req.body.status, parseInt(req.params.parcelId,10)];
                            const client = new Client(connectionString);
                            client.connect();
                            client.query(textUpdate, values)
                            .then((result) => {
                                parcelResponse = result.rows[0];
                                getUserId= result.rows[0].userid ; 
                                return Promise.all([parcelResponse, getUserId])     
                            })
                            .then(([parcelResponse,getUserId])=>{
                                const client = new Client(connectionString);
                                client.connect();
                                client.query(getUserEmail, [getUserId])
                                .then((result2) =>{
                                emailStatus(result2.rows[0].email)
                                 res.status(200).json({
                                        success: 'true',
                                        message: 'Parcel Location Updated successfully and Email sent successfully',
                                        data: parcelResponse
                                    });
                             })
                            }).catch((err) => { res.status(500).json({ error: err.message});
                            })
                }
                client.end()  }).catch((err) => {res.status(500).json({ error: err.message});
                client.end()      })
        }else{res.status(403).json({message:'You have no access'})}
        }).catch((err) => {res.status(500).json({ error: err.message});})
    }
}
export default AdminController;