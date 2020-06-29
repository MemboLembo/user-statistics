import updateUsersStatistics from './users-statistics';
import updateUsersCharts from './users-charts';
import updateUserData from './user-data';

const reducer = (state, action) => {
  return {
    usersStatistics: updateUsersStatistics(state, action),
    usersCharts: updateUsersCharts(state, action),
    userData: updateUserData(state, action),
  };
};

export default reducer;
