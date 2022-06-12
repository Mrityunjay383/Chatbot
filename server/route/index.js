const express = require("express");
const router = express.Router();

const data = require('../data.json');

router.get("/", (req, res) => {
  res.status(200).json({config: data.config});
});

router.post('/chatbot', (req, res) => {
  const {currIndex} = req.body;

  const noOfQuestions = Object.keys(data.questions).length;

  if(currIndex <= noOfQuestions){
    return res.status(200).json({q: data.questions[`${currIndex}`]});
  }else{
    return res.status(400).send("Stop");
  }
});

module.exports = router
