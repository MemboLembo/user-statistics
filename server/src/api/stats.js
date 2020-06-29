const statsService = require('../services/stats-service');
const express = require('express');
const validate = require("validate.js");
var moment = require('moment');
const router = express.Router({mergeParams: true});

const userConstraints = {
  numericality: {
    onlyInteger: true,
    greaterThan: 0,
  }
};

const dateConstraints = {
  format: {
    pattern: /\d{4}-\d{2}-\d{2}/,
    message: "must be a valid date"
  },
  datetime: {
    dateOnly: true,
  }
};

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

const validateStats = (id, startDate, endDate) => {
   return validate(
    {id, startDate, endDate}, {id: userConstraints, startDate: dateConstraints, endDate: dateConstraints
  });
};

router.get('/', async function (req, res) {
  const { id } = req.params;
  const { startDate, endDate } = req.query;
  const validationResult = validateStats(id, startDate, endDate);
  if (validationResult) {
    // validation failed
    res.status(400).send(validationResult);
  } 
  res.send(await statsService.getStats(+id, startDate, endDate));
});

module.exports = router;
