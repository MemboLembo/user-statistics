import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';

const createData = (chartData) => ({
  labels: chartData.data.map((data) => data.x),
  datasets: [{
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(58,128,186,0.4)',
    borderColor: 'rgba(58,128,186,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(58,128,186,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(58,128,186,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    ...chartData,
  }],
});

class Diagrams extends Component {
  render() {
    const { charts, loading, error } = this.props;
    const options = {
      responsive: true,
    };
    if (loading) {
      return <Spinner/>;
    }

    if (error) {
      return <ErrorIndicator/>;
    }

    return (
      <div className="diagrams">
        { charts.map(createData).map((data) => {
          return <div className="diagram-container" key={data.datasets[0].label}>
            <Line {...{ data, options }}/>
          </div>;
        }) }
      </div>
    );
  }
}

export default Diagrams;
