const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Sign In Page Here. Allow guest.' });
});

module.exports = router;
