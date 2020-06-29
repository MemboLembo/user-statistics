const User = require('../db/models/user');
const user = require('../db/models/user');

const statsService = {
  getUserData: async function(id) {
    const userData = await User.findAll({
      attributes: [
        'firstName',
        'lastName',
      ],
      where: {
        id,
      },
    });
    return {
      userData: userData[0],
    };
  }
}

module.exports = statsService;
