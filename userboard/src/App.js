import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import Transactions from './components/Transactions';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/user/:id" component={User} />
          <Route path="/transactions" component={Transactions} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
