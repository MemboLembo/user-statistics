const usersChartsRequested = () => {
  return {
    type: 'FETCH_USERS_CHARTS_REQUEST',
  };
};

const usersChartsLoaded = (newUserStatistics) => {
  return {
    type: 'FETCH_USERS_CHARTS_SUCCESS',
    payload: newUserStatistics,
  };
};

const usersChartsError = (error) => {
  return {
    type: 'FETCH_USERS_CHARTS_FAILURE',
    payload: error,
  };
};

// thunk
const fetchUsersCharts = (usersDataService) => (id, startDate, endDate) => (dispatch) => {
  dispatch(usersChartsRequested());
  usersDataService.getUsersCharts(id, startDate, endDate)
    .then((resp) => dispatch(usersChartsLoaded(resp.data)))
    .catch((err) => dispatch(usersChartsError(err)));
};

export {
  fetchUsersCharts,
};
