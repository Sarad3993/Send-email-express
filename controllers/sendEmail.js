const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount(); 
    // this is going to create a test account for us i.e a fake email account
    // we do this because we don't want to send emails to real people i.e just for testing purpose here
    // in production no need to do this as we will be using a real email service

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "chris.bartell82@ethereal.email",
        pass: "nmQs29KYuMz5JGjphC",
      },
    });

    let emailinfo = await transporter.sendMail({
      from: '"Sharad Upadhyaya" <risingstar3993@gmail.com>', // sender name and email address
      to: "bob@example.com", // list of receivers OR a single receiver
      subject: "Hello", // Subject line
      //text: "Hello World", // use for plain text body only
      html: "<b>Sending email using Node.js</b>", // html body
    });

    res.json(emailinfo); // used to send the response back to the client
}


// use SendGrid to send email (used in actual production)
// nodemailer is not used in this case as it is not a transport service rather it is a library that is used to send emails 
const sendEmailSendgrid = async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'krishnaraj3993@gmail.com', // Change to your recipient
      from: 'adhikarisaurav3993@gmail.com', // Change to your verified sender
      subject: 'Sending message with SendGrid',
      text: 'hello ! this is a test email', // use for plain text body only
      html: '<b> Hello! this is a test email </b>', // use for html text
    };
    const emailinfo = await sgMail.send(msg);
    res.json(emailinfo);
};

module.exports = sendEmailSendgrid;


 // We are going to use a transport service Ethereal that nodemailer is going to use to send the email 
// here nodemailer is just going to connect to the service and then the service will send the email 
// For testing purpose we can use: Ethereal or Mailtrap and for production we can use: SendGrid(popular), Mailgun, etc
