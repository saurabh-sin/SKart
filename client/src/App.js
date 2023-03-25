import ProductList from './Pages/ProductList';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Success from './Pages/Success';
import Orders from './Pages/Orders';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import WishList from './Pages/WishList';
import SearchResults from './Pages/SearchResults';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          success: {
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <HomeAuth>
              <Home />
            </HomeAuth>
          }
        />

        {/* <ProductList /> */}
        <Route exact path='/products/:category' element={<ProductList />} />
        <Route exact path='/product/:id' element={<Product />} />
        <Route exact path='/orders/:id' element={<Orders />} />
        <Route exact path='/wishlist/:id' element={<WishList />} />

        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/profile/:id' element={<Profile />} />

        <Route exact path='/searchresults/:query' element={<SearchResults />} />

        <Route
          exact
          path='/login'
          element={
            <CheckAuth>
              <Login />
            </CheckAuth>
          }
        />
        <Route exact path='/success' element={<Success />} />

        <Route exact path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}
const HomeAuth = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);
 // console.log(user);
  // <Navigate to='/login' />
   if (user) return children;
   else return <Navigate to='/login' />;
};

const CheckAuth = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);
  //<Navigate to='/login' />
   if (user) return <Navigate to='/' />;
   else return children;
};

export default App;
