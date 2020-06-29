const User = require('../db/models/user');
const Stats = require('../db/models/stats');
const sequelize = require('sequelize');

const userService = {
  getUsers: async function(page, perPage) {
    const users = await this.getUsersPerPage(page, perPage);
    const userIds = users.map((user) => {
      return user.id;
    });

    const stats = await this.getGroupedStats(userIds);
    const statsRefactored = stats.reduce((memo, model) => {
      const {userId, ...item} = model.toJSON();
      memo[userId] = item;
      return memo;
    }, {});

    const finalUsersList = users.map((user) => {
      const jsonUser = user.toJSON();
      jsonUser.totalClicks = statsRefactored[user.id].totalClicks;
      jsonUser.totalPageViews = statsRefactored[user.id].totalPageViews;
      return jsonUser;
    });

    const pageCount = await this.getPageCount(perPage);

    return {
      stats,
      finalUsersList,
      pageCount,
    };
  },

  getUsersPerPage: function(page, perPage) {
    const offset = (page - 1) * perPage;
    return User.findAll({
        offset: offset,
        limit: perPage
    });
  },

  getGroupedStats: function(userIds) {
    return Stats.findAll({
      attributes: {
        exclude: ['date', 'id', 'createdAt', 'updatedAt', 'pageViews', 'clicks'],
        include: [
          [sequelize.fn('SUM', sequelize.col('clicks')), 'totalClicks'],
          [sequelize.fn('SUM', sequelize.col('pageViews')), 'totalPageViews'],
        ]
      },
      where: {
        userId: userIds
      },
      group: 'userId',
    });
  },

  getPageCount: async function(perPage) {
    const totalUsers = await User.count();
    return  Math.ceil(totalUsers / perPage);
  }
}

module.exports = userService;
