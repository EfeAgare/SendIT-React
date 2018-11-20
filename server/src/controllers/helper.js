import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helper {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }
  /**
   * comparePassword
   * @param {string} hashPassword 
   * @param {string} password 
   * @returns {Boolean} return True or False
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
  
  /**
   * Generate Token
   * @param {string} id and role
   * @returns {string} token
   */
  static generateToken(userid, role) {
    const token = jwt.sign({ userId: userid, role: role},
      process.env.SECRET, { expiresIn: '24h' }
    );
    return token;
  }
}

export default Helper;