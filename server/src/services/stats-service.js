const User = require('../db/models/user');
const Stats = require('../db/models/stats');
const { Op } = require('sequelize');

const statsService = {
  getStats: async function(id, startDate, endDate) {
    const pageViews = await this.getChartsData('pageViews', id, startDate, endDate);
    const pageClicks = await this.getChartsData('clicks', id, startDate, endDate);


    return {
      pageViews,
      pageClicks,
      startDate,
      endDate,
    };
  },

  getChartsData: function(tableColumn, id, startDate, endDate) {
    return Stats.findAll({
      attributes: [
        'date',
        tableColumn,
      ],
      where: {
        userId: id,
        date: {
          [Op.between]: [startDate, endDate],
        }
      }
    });
  },
}

module.exports = statsService;
