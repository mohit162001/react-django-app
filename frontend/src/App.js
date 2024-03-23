import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import SignUp from "./Pages/SignUp";

import men_banner from "./Component/Assests/banner_mens.png";
import women_banner from "./Component/Assests/banner_women.png";
// import kid_banner from "./Component/Assests/banner_kids.png";
import RootLayOut from "./Pages/RootLayOut";
import { isAdmin, isAuthenticated } from "./helper";
import Login from "./Pages/LogIn";
import Orders from "./Pages/Orders";

import UserProfilePage from "./Pages/UserProfilePage";
import AdminLayout from "./Pages/AdminLayout";
import AddProductPage from "./Pages/AddProductPage";
import AddCategoryPage from "./Pages/AddCategoryPage";
import AllOrdersPage from "./Pages/AllOrdersPage";
import AllProductsPage from "./Pages/AllProductsPage";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayOut />,
      children: [
        {
          path: "",
          element: <Shop />,
        },
        {
          path: "/mens",
          element: <ShopCategory banner={men_banner} category="mens" />,
        },
        {
          path: "/womens",
          element: <ShopCategory banner={women_banner} category="womens" />,
        },
        {
          path: "/product",
          element: <Product />,
          children: [{ path: ":productId", element: <Product /> }],
        },
        { path: "/order", element: <Orders/>,loader:isAuthenticated },
        { path: "/cart", element: <Cart />,loader:isAuthenticated },
        { path: "/user", element: <UserProfilePage/>,loader:isAuthenticated},
        {path:"/admin",element:<AdminLayout/>,loader:isAdmin,children:[
          {path:'addproduct',element:<AddProductPage/>},
          {path:'addproduct/:productId',element:<AddProductPage/>},
          {path:'addcategory',element:<AddCategoryPage/>},
          {path:'allorders',element:<AllOrdersPage/>},
          {path:'allproducts',element:<AllProductsPage/>},
        ]}
      ],
    }, { path: "signup", element: <SignUp /> },
    { path: "login", element: <Login /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
