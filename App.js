import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/Signup">
            <Signup setLoggedIn={setLoggedIn} />
          </Route>
          <Route path="/login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>

          <Route
            path="/Profile"
            render={() => (
              loggedIn ? <Profile /> : <Redirect to="/login" />
            )}
          />
          <Redirect from="/" to="/Signup" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;