import {Client} from 'pg';
import nodemailer from 'nodemailer';
import Helpers from './helper';
import { connectionString} from '../config/config';

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});
/**
 * This Class is for User Password Controllers
 */
class PasswordController {

    /**
     * This method is for user password reset send email
     * @param {object} req - client request object
     * @param {object} res - server response object
     */

    static sendResetEmail(req, res) {
        const text = 'SELECT * FROM users WHERE email = $1';
        const client = new Client(connectionString);
        client.connect();
        client.query(text, [req.body.email])
            .then((result) => {
                if (!result.rows[0]) {
                    return res.status(404).json({
                        message: 'Email not Found'
                    });
                } else {
                    const token = Helpers.generateToken(result.rows[0].id, result.rows[0].role);
                    const mailOptions = {
                        from: process.env.NODEMAILER_USER,
                        to: req.body.email,
                        subject: 'Forget Password @ SENDIT.com',
                        html: `<h1>Forgot your Password</h1>
                        <p>Dear ${result.rows[0].lastname}</p><p> We\'ve  received a request to reset the password for this email address.</p><p>To reset your password please click on this link or copy and paste this URL into your browser (link expires in 24 hours)<a href='https://efeagare.github.io/SendIT/UI/resetpassword.html?token=${token}'> Click to reset Password </a></p><p>If you did not request to reset your password, please ignore this email. However, it may mean someone is trying to log in to your account</p>`,
                    };
                    transport.sendMail(mailOptions, (error) => {
                        if (error) {
                            return res.status(500).json({message: 'Email failed to send',errors:error.code});
                        }
                        res.status(200).json({
                            message: 'Kindly check your email for further instructions',
                            token: token
                        });
                    });
                }
            })
    }

    static confirmPasswordReset(req, res) {
        if (req.body.password === req.body.confirmPassword) {
            const hashPassword = Helpers.hashPassword(req.body.password);
            const text = 'UPDATE users SET password=$1 WHERE id=$2  RETURNING *'
            const values = [hashPassword, req.user.id]
            const client = new Client(connectionString);
            client.connect()
            client.query(text, values)
                .then((result) => {
                    if (!result.rows[0]) res.status(400).json({
                        message: 'Password reset failed'
                    });
                    const mailOptions = {
                        from: process.env.NODEMAILER_USER,
                        to: result.rows[0].email,
                        subject: 'Password Reset Successful @ SENDIT.com',
                        html: `<h1>Reset Password Successfully</h1>
                        <p>Dear ${result.rows[0].lastname}</p><p> Password reset Successfully. You can now login</p>
                        <p><a href='https://efeagare.github.io/SendIT/UI/signin.html'> Click to Login </a></p>`,
                    };
                    transport.sendMail(mailOptions, (error) => {
                        if (error) {
                            return res.status(500).json({message: 'Email failed to send',errors:error.code});
                        }
                        res.status(200).json({
                            message: 'Email sent.'
                        });
                    });
                    client.end();
                })
                .catch((error) => {
                    res.status(500).json(error.stack);
                    client.end();
                });
        } else {
            res.status(422).json({message: 'Password does not match'});
        }
    }
}

export default PasswordController;