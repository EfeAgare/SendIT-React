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

    
}

export default UserController;