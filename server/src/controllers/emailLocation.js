import nodemailer from 'nodemailer';

/**
 * This class handles Parcels Email controllers
 * */



    /**
     * This method sends all Parcels for Admin
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
        pass: process.env.NODEMAILER_PASS,
    },
});

const emailLocation =(email) =>{
    const mailOptions = {
        from:  process.env.NODEMAILER_USER,
        to:email,
        subject: 'Parcel Location Change',
        html: '<h1>Parcel Update</h1><p> The Location of your parcel has been change \
        login to your account to see current Location</p>',
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).json({ message: 'Email failed to send', error });
          }
          res.status(200).json({ message: 'Email sent successfully' });
        });
}
export default emailLocation;