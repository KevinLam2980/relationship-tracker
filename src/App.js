import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CycleTracking from './pages/CycleTracking';
import AddEvents from './pages/AddEvents';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/cycle-tracking" component={CycleTracking} />
          <Route path="/add-events" component={AddEvents} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;