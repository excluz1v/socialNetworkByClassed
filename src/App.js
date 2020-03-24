import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import home from './pages/home'
import signup from './pages/signup'
import login from './pages/login'
import Navbar from './components/layout/Navbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'
import store from './redux/reducers/store'
import { Provider } from 'react-redux'
import { SET_AUTHENTICATED } from './redux/reducers/types'
import { logOut, getUserData } from './redux/actions/userAction'
import axios from 'axios'
import User from './pages/user'

const theme = createMuiTheme(themeFile)

axios.defaults.baseURL = 'https://europe-west1-social-network-v2.cloudfunctions.net/api'

const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    store.dispatch(logOut())
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch >
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/signup' component={signup} />
                <AuthRoute exact path='/login' component={login} />
                <Route exact path='/users/:handle' component={User} />
                <Route exact path='/users/:handle/scream/:screamId' component={User} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>

    </MuiThemeProvider>
  );
}

export default App;
