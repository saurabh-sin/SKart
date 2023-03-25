import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import Home from './pages/home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';

function App() {
  const admin = useSelector((state) => {
    if (state.user.currentUser) return state.user.currentUser.others.isAdmin;
    else return null;
  });
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <CheckAuth>
            <Login />
          </CheckAuth>
        </Route>
        {admin && (
          <>
            <Topbar />
            <div className='container'>
              <Sidebar />
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/users'>
                <UserList />
              </Route>
              <Route path='/user/:userId'>
                <User />
              </Route>
              <Route path='/newUser'>
                <NewUser />
              </Route>
              <Route path='/products'>
                <ProductList />
              </Route>
              <Route path='/product/:productId'>
                <Product />
              </Route>
              <Route path='/newproduct'>
                <NewProduct />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

const CheckAuth = ({ children }) => {
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);
  if (user) {
    return <Redirect to='/' />;
  } else return children;
};

export default App;
