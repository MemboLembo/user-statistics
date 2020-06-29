/* eslint-disable no-param-reassign */
import moment from 'moment';

const updateUsersCharts = (state, action) => {
  if (state === undefined) {
    return {
      charts: [],
      loading: true,
      error: null,
    };
  }

  function onSucces(resp) {
    const {
      startDate, endDate, pageClicks, pageViews,
    } = resp.payload;

    function getRange(firstDate, lastDate) {
      const dateArray = [];
      let currentDate = moment(firstDate);
      const stopDate = moment(lastDate);
      while (currentDate <= stopDate) {
        dateArray.push({
          x: moment(currentDate).format('YYYY-MM-DD'),
          y: 0,
        });
        currentDate = moment(currentDate).add(1, 'days');
      }
      return dateArray;
    }

    const clickData = getRange(startDate, endDate);
    const viewData = [...clickData];

    function fillDates(dataArray, actualData, key) {
      actualData.forEach((data) => {
        const item = dataArray.find(({ x }) => x === data.date);
        if (item) {
          item.y = data[key];
        }
      });
    }

    fillDates(clickData, pageClicks, 'clicks');
    fillDates(viewData, pageViews, 'pageViews');

    return {
      charts: [
        {
          label: 'Clicks',
          data: clickData,
        },
        {
          label: 'Views',
          data: viewData,
        },
      ],
      loading: false,
      error: null,
    };
  }

  switch (action.type) {
    case 'FETCH_USERS_CHARTS_REQUEST':
      return {
        charts: [],
        loading: true,
        error: null,
      };

    case 'FETCH_USERS_CHARTS_SUCCESS':
      return onSucces(action);

    case 'FETCH_USERS_CHARTS_FAILURE':
      return {
        charts: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state.usersCharts;
  }
};

export default updateUsersCharts;
