import nodemailer from 'nodemailer';

/**
 * This class handles Parcels Email controllers
 * */

/**
 * This method sends change Parcels status for Admin
 * @param {array} req - Admin request array
 * @param {array} res - Server response array
 * @returns {array} success or failure
 */

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

const emailStatus = email => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'Parcel Status Change',
    html:
      '<h1>Parcel Update</h1><p> The Status of your parcel has been change \
        login to your account to see status</p>'
  };
  transport.sendMail(mailOptions, error => {
    return error;
  });
};

export default emailStatus;
