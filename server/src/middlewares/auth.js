import jwt from 'jsonwebtoken';

class Auth {
  /**
   * Verify Token 
   * @param {object} req - client request object
   * @param {object} res - server response object
   * @param {object} next - route
   * @returns {object|void} success or failure
   */
  static verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = { id: decoded.userId, role: decoded.role };
        next(); 
       } catch(error){
           return res.status(401).json({
               message: 'Authentication Failed'
           });
       }  
  }
}

export default Auth;