const express = require("express");
const router = express.Router();

const data = require('../data.json');
const {genRanUID} = require("../genRanUID");

router.get("/", (req, res) => {
  // Setting Up cookies
  const options = {
    expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  };

  return res.status(200).cookie('uid', genRanUID(), options).json({
    config: data.config
  });
});

router.post('/chatbot', (req, res) => {
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

module.exports = router
