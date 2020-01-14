import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import Nav from '../Nav';
import Auth from '@aws-amplify/auth';
import CONFIG from '../../config';
import SignIn from '../SignIn';
import AuthContext from '../../context/authentication';
import Forms from '../Forms';
import Stats from '../Stats';

//configure cognito
Auth.configure({
  region: CONFIG.COGNITO.REGION,
  userPoolId: CONFIG.COGNITO.USER_POOL_ID,
  userPoolWebClientId: CONFIG.COGNITO.USER_POOL_CLIENT_ID,
});

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  //check if user is authenticated upon mount
  useEffect(() => {
    //declare function inside, because useEffect cannot be async
    const updateUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        //set user in context (global state)
        setIsAuthenticated(true);
        setUser(user);
      } catch (error) {
        //error is thrown if user is not authenticated
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    updateUser();

    // disable linting rule, because we definitely only want
    // to call useEffect once and don't want dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      {isAuthenticated && (
        <Router>
          <Nav />
          <div className="content">
            <Switch>
              <Route path="/stats">
                <Stats />
              </Route>

              <Route path={['/scan', '/']}>
                <Forms />
              </Route>
            </Switch>
          </div>
        </Router>
      )}

      {!isAuthenticated && (
        <div className="signIn">
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default App;
