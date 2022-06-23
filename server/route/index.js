const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const data = require('../data.json');
const {
  genRanUID
} = require("../genRanUID");

router.get("/", (req, res) => {

  let uidCookie = req.cookies.uid;

  if (uidCookie) {
    res.status(200).json({
      config: data.config
    })
  } else {
    // Setting Up cookies
    const options = {
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    };

    return res.status(200).cookie('uid', genRanUID(), options).json({
      config: data.config
    });
  }
});

router.post('/chatbot', async (req, res) => {
  const {
    currIndex
  } = req.body;

  const noOfQuestions = Object.keys(data.questions).length;

  if (currIndex <= noOfQuestions) {
    return res.status(200).json({
      q: data.questions[`${currIndex}`]
    });
  } else {
    return res.status(400).send("Stop");
  }
});

router.post("/sendMail", async (req, res) => {
  const {
    userEmail,
    resArr,
    uid
  } = req.body;

  const creatorID = "connect@vajra.ai";

  let responceHTML = "";

  await resArr.forEach((res, index) => {
    responceHTML += `
      <div>
        <p>${index+1}) ${res.title}</p>
        <p style="margin-right: 10px">Response: ${res.response}</p>
      </div>
    `
  })

  //html mail template
  const output = `
          <div style="">
            <h3>New Input from UserID (${uid})</h3>
            ${responceHTML}
            <p>Sent from ${uid} at <a href="mailto:${creatorID}">${creatorID}</a></p>
          </div>
        `;

  const transporter = await nodemailer.createTransport({

    service: 'gmail',
    secureConnection: true,
    auth: {
      user: process.env.AUTHER_GMAILID,
      pass: process.env.AUTHER_PASSWORD
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
      secureProtocol: "TLSv1_method"
    }
  });

  var mailOptions = {
    from: `Viraj Chatbot<${process.env.AUTHER_GMAILID}>`,
    to: [userEmail, creatorID], //Change reciving email here
    subject: "New User Input",
    text: '',
    html: output
  };

  await transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + info.response);

      //returning the otp as json object
      res.status(200).send("Mail Sent");
    }
  });




  res.status(200).send("test");
})

module.exports = router
