import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import SignUp from "./Pages/SignUp";

import men_banner from "./Component/Assests/banner_mens.png";
import women_banner from "./Component/Assests/banner_women.png";
import kid_banner from "./Component/Assests/banner_kids.png";
import RootLayOut from "./Pages/RootLayOut";
import { checkAuth } from "./helper";
import Login from "./Pages/LogIn";
import Orders from "./Pages/Orders";

import UserProfilePage from "./Pages/UserProfilePage";


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
          element: <ShopCategory banner={men_banner} category="1" />,
        },
        {
          path: "/womens",
          element: <ShopCategory banner={women_banner} category="2" />,
        },
        {
          path: "/product",
          element: <Product />,
          children: [{ path: ":productId", element: <Product /> }],
        },
        { path: "/order", element: <Orders/>,loader:checkAuth },
        { path: "/cart", element: <Cart />,loader:checkAuth },
        { path: "/user", element: <UserProfilePage/>,loader:checkAuth},
      ],
    }, { path: "signup", element: <SignUp /> },
    { path: "login", element: <Login /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
