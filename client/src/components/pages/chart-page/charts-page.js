import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from '../../../utils';
import { withUsersDataService } from '../../hoc';
import { fetchUsersCharts } from '../../../actions/users-charts-actions';
import { fetchUserData } from '../../../actions/user-data-actions';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import Diagrams from './diagrams';

import 'react-datepicker/dist/react-datepicker.css';

const START_DATE = new Date(new Date()).setDate((new Date()).getDate() - 6);

class ChartsPage extends Component {
  state = {
    startDate: START_DATE,
    endDate: new Date(),
  };

  componentDidMount() {
    this.props.fetchUsersCharts(
      this.props.match.params.id,
      this.state.startDate,
      this.state.endDate,
    );
    this.props.fetchUserData(this.props.match.params.id);
  }

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date,
    });
  };

  render() {
    const { id } = this.props.match.params;
    const { fetchUsersCharts: fetchUsersChartsOnClick, fetchUserData: fetchUserDataOnClick } = this.props;
    const { startDate, endDate } = this.state;
    const {
      charts, loading, error, userData,
    } = this.props;
    let user = '...';
    if (userData.data) {
      user = `${userData.data.firstName} ${userData.data.lastName}`;
    }

    return (
      <div className="container">
        <div className="charts">
          <Header/>

          <div className="inner-blocks">
            <nav className="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__item"><Link to="/">Main page &gt; </Link></li>
                <li className="breadcrumb__item"><Link to="/stats">User statistics &gt; </Link></li>
                <li className="breadcrumb__item breadcrumb__item_active"><Link to={`/user/${id}`}>{user}</Link></li>
              </ol>
            </nav>

            <div className="subheader">
              <div className="user-name">{user}</div>

              <div className="date-picker">
                <label>FROM:</label>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={this.state.startDate}
                  onChange={this.handleChangeStartDate}
                />
                <label>TO:</label>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={this.state.endDate}
                  onChange={this.handleChangeEndDate}
                />
                <button
                  className="date-picker-submit"
                  onClick={() => {
                    fetchUsersChartsOnClick(id, startDate, endDate);
                    fetchUserDataOnClick(id);
                  }}>
                    Sunbmit
                </button>
              </div>
            </div>

            <Diagrams
              charts={charts}
              loading={loading}
              error={error}
            />
          </div>

          <Footer/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ usersCharts: { charts, loading, error }, userData }) => {
  return {
    userData,
    charts,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, { usersDataService }) => {
  return {
    ...bindActionCreators({
      fetchUsersCharts: fetchUsersCharts(usersDataService),
      fetchUserData: fetchUserData(usersDataService),
    }, dispatch),
  };
};

export default compose(
  withUsersDataService(),
  connect(mapStateToProps, mapDispatchToProps),
)(ChartsPage);
