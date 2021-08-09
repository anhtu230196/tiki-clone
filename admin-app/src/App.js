import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './container/Home/Home';
import Signup from './container/Signup/Signup';
import Signin from './container/Signin/Signin';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/auth.action';
import Products from './container/Products/Products';
import Orders from './container/Orders/Orders';
import Category from './container/Category/Category';
import { getInitialDate } from './actions/initialData.action';

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    dispatch(getInitialDate())
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/products" exact component={Products} />
          <PrivateRoute path="/orders" exact component={Orders} />
          <Route path="/signin" component={Signin} />
          <Route path="/category" component={Category} />
          {/* <Route path="/signup" component={Signup} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
