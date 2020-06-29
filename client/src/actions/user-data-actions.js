const userDataRequested = () => {
  return {
    type: 'FETCH_USER_DATA_REQUEST',
  };
};

const userDataLoaded = (newUserData) => {
  return {
    type: 'FETCH_USER_DATA_SUCCESS',
    payload: newUserData,
  };
};

const userDataError = (error) => {
  return {
    type: 'FETCH_USER_DATA_FAILURE',
    payload: error,
  };
};

// thunk
const fetchUserData = (usersDataService) => (id) => (dispatch) => {
  dispatch(userDataRequested());
  usersDataService.getUserData(id)
    .then((resp) => dispatch(userDataLoaded(resp.data)))
    .catch((err) => dispatch(userDataError(err)));
};

export {
  fetchUserData,
};
