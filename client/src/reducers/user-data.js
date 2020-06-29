const updateUserData = (state, action) => {
  if (state === undefined) {
    return {
      data: null,
      loading: true,
      error: null,
    };
  }

  switch (action.type) {
    case 'FETCH_USER_DATA_REQUEST':
      return {
        data: null,
        loading: true,
        error: null,
      };

    case 'FETCH_USER_DATA_SUCCESS':
      return {
        data: action.payload.userData,
        loading: false,
        error: null,
      };

    case 'FETCH_USER_DATA_FAILURE':
      return {
        data: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state.userData;
  }
};

export default updateUserData;
