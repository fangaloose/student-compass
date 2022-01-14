const configs = require('./configs');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configs.email,
      pass: configs.password,
    },
  });
  

  async function sendEmail(to, text) {

  let mailOptions = {
    from: configs.email,
    to: to,
    subject: "Student Compass Account Verification",
    text: text,
    
  };
  
    await transporter.sendMail(mailOptions);


}

module.exports = sendEmail;