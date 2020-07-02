import React, { Component } from 'react';
import RenderRows from './render-rows';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';

class Table extends Component {
  render() {
    const { statistics, loading, error } = this.props;
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }
    return (
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

        <RenderRows statistics={statistics}/>
      </table>
    </div>
    );
  }
}

export default Table;
