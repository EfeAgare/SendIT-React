import { Client} from 'pg';

const connectionString = 'postgres://postgres:@localhost:5433/sendit';


/**
 * This class handles Parcels Order controllers
 * */

class ParcelController {

    /**
     * This method gets all Parcels for Admin
     * @param {array} req - Admin request array
     * @param {array} res - Server response array
     * @returns {array} success or failure 
     */
    static getAllParcels(req, res) {
        console.log(req.user);
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
                            res.status(404).json({
                                message: 'Parcels not Found'
                            });
                            client.end()
                        });

                } else {
                    res.status(403).json({
                        message: 'FORBIDDEN'
                    })
                }
            }).catch((err) => {
                console.log(err)


            })
    }

    

}

export default ParcelController;