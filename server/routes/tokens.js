const knex = require('../db/knex');
const express = require('express');
const router = express.Router();


// PATH: /tokens ACTION: CREATE
router.post('/', function(req, res, next) {

  const { email, password } = req.body

  knex
    .first()
    .from('users')
    .where({email: email})
    .then(user => {
      res.json(user);
    });
});

module.exports = router;
