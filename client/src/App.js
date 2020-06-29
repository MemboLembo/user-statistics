import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './components/pages/main-page';
import StatsPage from './components/pages/stats-page/stats-page';
import ChartsPage from './components/pages/chart-page/charts-page';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" component={MainPage} exact />

        <Route path="/stats" component={StatsPage} />

        <Route path="/user/:id" component={ChartsPage}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
