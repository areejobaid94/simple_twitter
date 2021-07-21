import nodemailer  from 'nodemailer' ;
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'emergency.app987@gmail.com',
          pass: 'qwe asd zxc 123'
        }
      });
      var mailOptions = {
        from: 'emergency.app987@gmail.com',
        to: "areej.obaid17894@gmail.com",
        subject: req.body.name + " " + req.body.subject,
        text: req.body.message,
      };
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          }
        res.json("done");
    });
});

export default router;