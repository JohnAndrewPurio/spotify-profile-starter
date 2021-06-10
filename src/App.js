import './App.css';
import Login from './components/Login';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
