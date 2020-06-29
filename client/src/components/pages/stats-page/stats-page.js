import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import RenderRows from './render-rows';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import { fetchUsersStatistics } from '../../../actions/users-statistics-actions';
import { compose } from '../../../utils';
import { withUsersDataService } from '../../hoc';
import '../../../scss/stats-page/stats-page.scss';

const DEFAULT_PAGE = 1;
const USERS_PER_PAGE = 50;

class StatsPage extends Component {
  componentDidMount() {
    this.props.fetchUsersStatistics(DEFAULT_PAGE, USERS_PER_PAGE);
  }

  render() {
    const {
      statistics, loading, error, fetchUsersStatistics: fetchUsersStatisticsOnClick,
    } = this.props;

    let pageCount = 0;
    if (statistics.data) {
      pageCount = statistics.data.pageCount;
    }

    const handlePageClick = (data) => {
      console.log(data.selected + 1, fetchUsersStatisticsOnClick);
      fetchUsersStatisticsOnClick(data.selected + 1, USERS_PER_PAGE);
    };

    return (
      <div className="container">
        <div className="stats">
          <Header/>
          <div className="stats__table">

            <nav className="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__item"><Link to="/">Main page &gt; </Link></li>
                <li className="breadcrumb__item breadcrumb__item_active"><Link to="/stats">User statistics</Link></li>
              </ol>
            </nav>

            <div className="stats__table__title">User statistic</div>
            <div className="table-box">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>IP address</th>
                    <th>Total clicks</th>
                    <th>Total page views</th>
                  </tr>
                </thead>

                <RenderRows
                  statistics={statistics}
                  loading={loading}
                  error={error}/>
              </table>

            </div>

          </div>

          <ReactPaginate
            previousLabel={<div className="left-button">&nbsp;</div>}
            nextLabel={<div className="right-button">&nbsp;</div>}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />

          <Footer/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ usersStatistics: { statistics, loading, error } }) => {
  return {
    statistics,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, { usersDataService }) => {
  return {
    ...bindActionCreators({
      fetchUsersStatistics: fetchUsersStatistics(usersDataService),
    }, dispatch),
  };
};

export default compose(
  withUsersDataService(),
  connect(mapStateToProps, mapDispatchToProps),
)(StatsPage);
