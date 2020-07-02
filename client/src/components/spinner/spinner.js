import React from 'react';
import '../../scss/_spinner.scss';

const Spinner = () => {
  return (<div className="spinner">
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
  </div>);
};

export default Spinner;
