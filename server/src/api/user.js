const statsService = require('../services/user-service');
const express = require('express');
const validate = require("validate.js");
const router = express.Router({mergeParams: true});

const userConstraints = {
  numericality: {
    onlyInteger: true,
    greaterThan: 0,
  }
};

const validateId = (id) => {
   return validate(
    {id}, {id: userConstraints});
};

router.get('/', async function (req, res) {
  const { id } = req.params;
  const validationResult = validateId(id);
  if (validationResult) {
    // validation failed
    res.status(400).send(validationResult);
  } 
  res.send(await statsService.getUserData(+id));
});

module.exports = router;
