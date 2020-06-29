const { Sequelize } = require('sequelize');
const User = require('./models/user');
const Stats = require('./models/stats');
const usersDb = require('../../json-db/users.json');
const statsDb = require('../../json-db/users_statistic.json');
const _ = require('lodash');

//changing keys to camelCase to keep consistant code style
const toCamelCase = (array) => {
  array.forEach((user) => {
    Object.entries(user).forEach(([key, value]) => {
      const newKey = _.camelCase(key);
      delete user[key];
      user[newKey] = value;
    });
  });
}

exports.init = async() => {

  const sequelize = new Sequelize('sqlite::memory:')

  User.initialize(sequelize);
  Stats.initialize(sequelize);

  await sequelize.sync({
    force: true
  });

  toCamelCase(usersDb);
  toCamelCase(statsDb);

  await User.bulkCreate(usersDb);
  await Stats.bulkCreate(statsDb);
}

