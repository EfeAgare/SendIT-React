import express from 'express';
import userController from '../controllers/userController';
import idValidation from '../middlewares/idValidation';
import userValidation from '../middlewares/userValidation';
import resetPasswordController from '../controllers/resetPasswordController';
import Auth from '../middlewares/auth';

const parseRoute = express();


parseRoute.route('/auth/signup')
.post(userValidation.signUp, userController.userSignUp)

parseRoute.route('/auth/login')
.post(userValidation.login, userController.login)

parseRoute.route('/users/:userId/parcels')
.get(Auth.verifyToken, idValidation.userId ,userController.getUserParcels);

parseRoute.route('/users/:userId/:parcelId')
.get(Auth.verifyToken, idValidation.userId, idValidation.parcelId,
     userController.getAUserParcel);

parseRoute.route('/users/auth/resetpassword')
.post(userValidation.resetEmail,resetPasswordController.sendResetEmail)
.put(Auth.verifyToken, userValidation.resetPassword, resetPasswordController.confirmPasswordReset);

export default parseRoute;

