import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>email: {loggedInUser.email}</p> 
      <Router>
        <Header></Header>
        <Switch>
          <Route path = "/shop">
            <Shop></Shop>
          </Route>
          <Route path = "/review">
            <Review></Review>
          </Route>
          <PrivateRoute path = "/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path = "/login">
            <Login></Login>
          </Route>
          <PrivateRoute path = "/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          
          <Route exact path = "/">
            <Shop></Shop>
          </Route>
          <Route path = "/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route> 
          <Route path = "*">
            {/* (*) this option should be the last option.
            -can declare a separate component named Notfound as per class video */}
              <h1>Sorry, page not found</h1>
              <h2>404 error</h2>
          </Route>
        </Switch>
      </Router>    
    </UserContext.Provider>
  );
}

export default App;
