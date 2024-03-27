import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ShopContextProvider from "./Context/ShowContext";
import RootLayOut from "./Pages/RootLayOut";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/LogIn";
import Orders from "./Pages/Orders";
import UserProfilePage from "./Pages/UserProfilePage";
import AdminLayout from "./Pages/AdminLayout";
import AddProductPage from "./Pages/AddProductPage";
import AddCategoryPage from "./Pages/AddCategoryPage";
import AllOrdersPage from "./Pages/AllOrdersPage";
import AllProductsPage from "./Pages/AllProductsPage";
import AdminLanding from "./Pages/AdminLanding";
import FallBack from "./Component/FallBack/FallBack";
import login_first from "./Component/Assests/login_first.png";
import unauthorized_img from "./Component/Assests/unauthorized-image.png";
import mens_banner from "./Component/Assests/banner_mens.png";
import womens_banner from "./Component/Assests/banner_women.png";

import { isAuthenticated, isAdminUser } from "./helper";
// import { useHistory } from 'react-router-dom';


function App() {

  return (
    <Router>
      <ShopContextProvider>
        <Switch>
          <Route exact path="/">
            <RootLayOut>
              <Shop />
            </RootLayOut>
          </Route>
          <Route path="/mens">
            <RootLayOut>
              <ShopCategory banner={mens_banner} category="mens" />
            </RootLayOut>
          </Route>
          <Route path="/womens">
            <RootLayOut>
              <ShopCategory banner={womens_banner} category="womens" />
            </RootLayOut>
          </Route>
          <Route exact path="/product/:productId">
            <RootLayOut>
              <Product />
            </RootLayOut>
          </Route>
          <Route exact path="/order">
            <RootLayOut>
              {isAuthenticated() && <Orders /> }
              {!isAuthenticated() && <FallBack image={login_first} heading={"Please Login First"} btn_lable={"login"} link={"/login"} /> }

            </RootLayOut>
          </Route>
          <Route exact path="/cart">
            <RootLayOut>
              {isAuthenticated() && <Cart /> }
              {!isAuthenticated() && <FallBack image={login_first} heading={"Please Login First"} btn_lable={"login"} link={"/login"} /> }

            </RootLayOut>
          </Route>
          <Route exact path="/user">
            <RootLayOut>
              {isAuthenticated() && <UserProfilePage /> }
              {!isAuthenticated() && <FallBack image={login_first} heading={"Please Login First"} btn_lable={"login"} link={"/login"} /> }
            </RootLayOut>
          </Route>
          {/* <Route path="/unauthenticated">
            <RootLayOut>
              <FallBack
                image={login_first}
                heading={"Please Login First"}
                btn_lable={"login"}
                link={"/login"}
              />
            </RootLayOut>
          </Route> */}
          <Route path="/unauthorized">
            <RootLayOut>
              <FallBack image={unauthorized_img} heading={"You are not Authorized"} btn_lable={"Back"} setMenuValue={"shop"} link={"/"}/>
            </RootLayOut>
          </Route>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/admin">
            <RootLayOut>
              {isAdminUser() && (
                <AdminLayout>
                  <Switch>
                    <Route exact path="/admin">
                      <AdminLanding />
                    </Route>
                    <Route exact path="/admin/addproduct">
                      <AddProductPage />
                    </Route>
                    <Route exact path="/admin/addproduct/:productId">
                      <AddProductPage />
                    </Route>
                    <Route exact path="/admin/addcategory">
                      <AddCategoryPage />
                    </Route>
                    <Route exact path="/admin/allorders">
                      <AllOrdersPage />
                    </Route>
                    <Route exact path="/admin/allproducts">
                      <AllProductsPage />
                    </Route>
                  </Switch>
                </AdminLayout>
              )}
              {!isAdminUser() && <FallBack image={unauthorized_img} heading={"You are not Authorized"} btn_lable={"Back"} setMenuValue={"shop"} link={"/"}/>}

            </RootLayOut>
          </Route>
        </Switch>
      </ShopContextProvider>
    </Router>
  );
}


export default App;
