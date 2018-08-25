let express = require('express');
let router = express.Router();
let nodemailer = require('nodemailer');
let creds = require('../config.js');

var transport = {
  host: 'smtp.gmail.com',
  
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  console.log(req.body)
  let { email, name, message} = req.body;
  // var name = req.body.name
  // var email = req.body.email
  // var message = req.body.message
  console.log(message)
  var content = `name: ${name} \n email: ${email} \n message: ${message} `
  
  var mail = {
    from: name,
    to: 'carlosarturoandrade86@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;