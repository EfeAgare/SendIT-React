import {Client} from 'pg';
import Helpers from './helper';


const connectionString = 'postgres://postgres:@localhost:5433/sendit';


/**
 * This Class is for the User Controllers
 */

class UserController {

    /**
     * This method is for user signup
     * @param {object} req - client request object
     * @param {object} res - server response object
     */

    static userSignUp(req, res) {
        const text = 'SELECT email FROM users WHERE email = $1';
        const hashPassword = Helpers.hashPassword(req.body.password);
        const textConfirm = `INSERT INTO users(username, email, password, role)
        VALUES($1, $2, $3, $4)  returning *`;
        const values = [
            req.body.username,
            req.body.email,
            hashPassword,
            'user'
        ];
        const client = new Client(connectionString);
        client.connect();
        client.query(text, [req.body.email])
            .then((result) => {
                if (result.rows[0]) {
                    return res.status(409).json({
                        message: "Email Address Already exists"
                    });
                } else {
                    const client = new Client(connectionString);
                    client.connect();
                    client.query(textConfirm,values)
                        .then((result) => {
                            const token = Helpers.generateToken(result.rows[0].id, result.rows[0].role);
                            res.status(201).json({
                                message: 'user created successfully',
                                token: token,
                                data: [result.rows[0].username,
                                 result.rows[0].email,
                                  result.rows[0].role ]
                            });
                            client.end()
                        })
                } client.end()
            })
            .catch((err) => {
                console.log(err)
                client.end()
            });
    }

     /**
     * This method gets login users
     * @param {array} req - user request array
     * @param {array} res - Server response array
     * @returns {array} success or failure 
     */


    static login (req, res) {
        const text = 'SELECT * FROM users WHERE email = $1';
        const client = new Client(connectionString);
        client.connect();
        client.query(text, [req.body.email])
        .then((result) => {
            if (!result.rows[0]) {
             return res.status(401).json({ message: 'No account with this email address' });
            }
            if(!Helpers.comparePassword(result.rows[0].password, req.body.password)) {
                return res.status(400).send({ 
                    message: 'Invalid Password' });
              }
              console.log(result.rows[0].role);
              const token = Helpers.generateToken(result.rows[0].id, result.rows[0].role);
              return res.status(200).json({
                message: 'Login successful',
                data: [result.rows[0].username, result.rows[0].email, result.rows[0].role ],
                token:  token });
             })
          .catch((err) => {
            res.status(500).json(err.stack);
            client.end();
          });

        }

        
    /**
     * This method gets all user Parcels
     * @param {array} req - user request array
     * @param {array} res - Server response array
     * @returns {array} success or failure 
     */
    static getUserParcels(req, res) {
        const text = `SELECT * FROM parcels WHERE userid = $1`;
        const getuser = `SELECT role FROM users WHERE role =$1 `;
        const client = new Client(connectionString);
        client.connect();
        client.query(getuser, [req.user.role])
        .then((result) => {
            if (result.rows[0].role === 'user'){  
                const client = new Client(connectionString);
                client.connect();                
                 client.query(text,[req.user.id])
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
                })
                client.end()
            });

            }else{
                res.status(403).json({message: 'FORBIDDEN'})
            }
        }).catch((err) => {  res.status(404).json({ message: 'Parcels not Found'})})
     }

     /**
     * This Method fetch  a Parcel order belonging to a User
     * @param {object} req - client request object
     * @param {object} res -server response object
     * @returns {object} success or failure
     */
    static getAUserParcel(req, res) {
        const text = 'SELECT * FROM parcels WHERE id= $1 AND userid = $2';
        const getuser = `SELECT id, role FROM users WHERE id= $1 AND role =$2 `;
        console.log(parseInt(req.params.userId, 10))
        const client = new Client(connectionString);
        client.connect();
        client.query(getuser, [req.user.id, req.user.role])
        .then((result) => {
            if (result.rows[0].role === 'user'){
               const client = new Client(connectionString);
               client.connect();
               client.query(text, [parseInt(req.params.parcelId, 10),req.user.id])
                .then((result) => {
                    if (result.rows[0]) {
                            res.status(200).json({
                                success: 'true',
                                message: 'Parcel retrieved successfully',
                                data: result.rows[0]
                            });
                       
                        }else {
                        res.status(404).json({
                            message: "No valid entry found for provided ID"
                        });
                    }
                    client.end()
                }).catch((err) => {
                    res.status(500).json({
                        error: err.message
                    });
                    client.end()
                });
            }else{
                res.status(403).json({message: 'FORBIDDEN'})
            }
        }).catch((err) => {
            res.status(500).json({
                error: err.message}); client.end()
        });
       
    }
    
    
}

export default UserController;