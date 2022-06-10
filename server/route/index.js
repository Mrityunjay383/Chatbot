const express = require("express");
const router = express.Router();

const data = require('../data.json');

router.get("/", (req, res) => {
  res.status(200).json({config: data.config});
});

router.get('/chatbot', (req, res) => {
  
});

module.exports = router
