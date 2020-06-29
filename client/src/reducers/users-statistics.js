const updateUsersStatistics = (state, action) => {
  const items = [];
  if (state === undefined) {
    return {
      statistics: items,
      loading: true,
      error: null,
    };
  }

  switch (action.type) {
    case 'FETCH_USERS_STATISTICS_REQUEST':
      return {
        statistics: [],
        loading: true,
        error: null,
      };

    case 'FETCH_USERS_STATISTICS_SUCCESS':
      return {
        statistics: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_USERS_STATISTICS_FAILURE':
      return {
        statistics: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state.usersStatistics;
  }
};

export default updateUsersStatistics;
