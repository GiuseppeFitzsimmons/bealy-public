import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from './app/screens/Login';
import Main from './app/screens/Main';
import Room from './app/screens/Room';
import socketIOClient from "socket.io-client";
const env = require('./features/environment');


function App() {
  var environment = env.getEnvironment(window.location.origin);
  const socket = socketIOClient(environment.socket);

  var loggedIn = useSelector(state => {
    let result = localStorage.getItem('access_token');
    return result != null;
  });

  return (
    <Switch>
      <Route path="/room">
        <Room socket={socket}/>
      </Route>
      <Route path="/">
        {loggedIn ? <Main socket={socket}/> : <Login/>}
      </Route>
    </Switch>
  );
};

export default App;
