import { createBrowserRouter } from "react-router-dom";
import ProductDetail from "../pages/user/productdetails";
import About from "../pages/user/about";
import Contact from "../pages/user/contact";
import Login from "../pages/user/login";
import Signup from "../pages/user/signup";
import HomePage from "../pages/user/homepage";
import ShoppingCartPage from "../pages/user/cart";
import Shop from "../pages/user/shop";
import OccasionsPage from "../pages/user/occasionspage";
import Checkout from "../pages/user/checkout";
import Product from "../pages/admin/product";
import Complaints from "../pages/admin/complaints"; 
import Orders from "../pages/admin/order";
import Customers from "../pages/admin/customer";
import CalendarPage from "../pages/admin/calendar";
import NotFoundPage from "../pages/user/notfound";
import Admin from "../pages/user/admin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/homepage",
        element: <HomePage />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/shop",
        element: <Shop />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/occasionspage",
        element: <OccasionsPage />,
    },
    {
        path: "/cart",
        element: <ShoppingCartPage />,
    },
    {
        path: "/checkout",
        element: <Checkout />,
    },
    {
        path: "/:productId",
        element: <ProductDetail />,
    },
    // Admin routes
    {
        path: "/admin",
        element: <Admin />,
    },
    {
        path: "/admin/products",
        element: <Product />,
    },
    {
        path: "/admin/complaints",
        element: <Complaints />,
    },
    {
        path: "/admin/orders",
        element: <Orders />,
    },
    {
        path: "/admin/customers",
        element: <Customers />,
    },
    {
        path: "/admin/calendar",
        element: <CalendarPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);