import './App.css';
import MealsProvider from './contexts/products';
import UsersProvider from './contexts/users';
import OrdersProvider from './contexts/orders';
import AuthProvider from './contexts/auth';
import Home from './views/Home';
import {Header} from './components/homeComponents';
import Loginn from './views/admin/login';
import {Dashboard, Update} from './components/adminComponents';
import UserRecords from './components/viewUsersComponent';
import Login from './components/adminLogin';
import AddUser from './components/addUsersComponent';
import {SignUp} from './components/adminComponents';
import AddProduct from './components/addproductComponent';
import UpdateProduct from './components/updateProductComponent';
import UpdateUser from './components/updateUserComponent';
import ViewOrders from './components/viewOrdersComponent';
import ViewProducts from './components/viewProductsComponent';
import ProtectedRoute from './components/protectedRoute';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <MealsProvider>
        <UsersProvider>
          <OrdersProvider>
            <Router>
              <Header />
              <Switch>
                <Route exact path='/' component= {Home} />
                {/* <Route exact path='/house' component= {House} /> */}
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={SignUp}/>
                <ProtectedRoute exact path='/users' component={UserRecords}/>
                <ProtectedRoute path='/add' component={AddUser}/>
                <ProtectedRoute path='/dashboard' component={Dashboard}/>
                <ProtectedRoute path='/updateuser' component={UpdateUser}/>
                <ProtectedRoute path='/users' component={UserRecords}/>
                <ProtectedRoute path='/orders' component={ViewOrders}/>
                <ProtectedRoute path='/products' component={ViewProducts}/>
                <ProtectedRoute path='/addproduct' component={AddProduct}/>
                <ProtectedRoute path='/admin/user/:userId' component={Update}/>
                <ProtectedRoute path='/admin/product/:productId' component={UpdateProduct}/>
                {/* <Route exact path="/" component={home} /> */}
                <ProtectedRoute path="/admin" component={Loginn} />
              </Switch>
            </Router>
          </OrdersProvider>
        </UsersProvider>
      </MealsProvider>
    </AuthProvider>
  );
}

export default App;
