const userService = require('../services/users-service');
const express = require('express');
const validate = require("validate.js");
const router = express.Router();

const constraints = {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    }
};

const validateUsers = (page, perPage) => {
  return validate({page: page, perPage: perPage}, {page: constraints, perPage: constraints});
};

router.get('/', async function (req, res) {
  const { page, perPage } = req.query;
  const validationResult = validateUsers(page, perPage);
  if (validationResult) {
    // validation failed
    res.status(400).send(validationResult);
  }
  // const 
  res.send(await userService.getUsers(+page, +perPage));
});

module.exports = router;