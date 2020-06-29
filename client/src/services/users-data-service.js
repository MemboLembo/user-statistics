/* eslint-disable class-methods-use-this */
import axios from 'axios';
import moment from 'moment';

export default class UsersDataService {
  getUsersStatistics(page, perPage) {
    return axios.get('/api/users', {
      params: {
        page,
        perPage,
      },
    });
  }

  async getUsersCharts(id, startDate, endDate) {
    if (startDate > endDate) {
      throw new Error('Start date cannot be greater than end date');
    }
    return axios.get(`/api/users/${id}/stats`, {
      params: {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      },
    });
  }

  getUserData(id) {
    return axios.get(`/api/user/${id}`);
  }
}
