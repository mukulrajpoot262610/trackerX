import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavbarC from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Loading from './pages/Loading';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux'
import Add from './pages/Add';
import Profile from './pages/Profile';
import Movements from './pages/Movements';

function App() {

  const auth = useSelector(state => state.isAuth)

  return (
    <Router>
      <NavbarC />
      <Switch>
        <Route exact path='/' component={Loading} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/stats'>
          {auth ? <Dashboard /> : <Signin />}
        </Route>
        <Route exact path='/add'>
          {auth ? <Add /> : <Signin />}
        </Route>
        <Route exact path='/profile'>
          {auth ? <Profile /> : <Signin />}
        </Route>
        <Route exact path='/movements'>
          {auth ? <Movements /> : <Signin />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
