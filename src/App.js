import './App.css';
import Login from './components/Login';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
