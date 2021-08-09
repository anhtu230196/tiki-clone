import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage';
import ProductListPage from './containers/ProductListPage/ProductListPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route to="/:slug" component={ProductListPage} />
          <Route to="/" exact component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
