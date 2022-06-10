const express = require("express");
const router = express.Router();

const data = require('../data.json');


router.get("/", (req, res) => {
  res.status(200).json({config: data.config});
});

router.post('/chatbot', (req, res) => {
  const {currIndex} = req.body;
  console.log(currIndex);
  res.status(200).json({q: data.questions[`${currIndex}`]});
});

module.exports = router
