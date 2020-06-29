const usersStatisticsRequested = () => {
  return {
    type: 'FETCH_USERS_STATISTICS_REQUEST',
  };
};

const usersStatisticsLoaded = (newUserStatistics) => {
  return {
    type: 'FETCH_USERS_STATISTICS_SUCCESS',
    payload: newUserStatistics,
  };
};

const usersStatisticsError = (error) => {
  return {
    type: 'FETCH_USERS_STATISTICS_FAILURE',
    payload: error,
  };
};

// thunk
const fetchUsersStatistics = (usersDataService) => (defaultPage, perPage) => (dispatch) => {
  dispatch(usersStatisticsRequested());
  usersDataService.getUsersStatistics(defaultPage, perPage)
    .then((data) => dispatch(usersStatisticsLoaded(data)))
    .catch((err) => dispatch(usersStatisticsError(err)));
};

export {
  fetchUsersStatistics,
};
