import Main from "../Layout/Main";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Details from "../pages/Media/Details";
import Media from "../pages/Media/Media";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <PrivateRoute><Media></Media></PrivateRoute>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/details/:_id',
                element: <Details></Details>,
                loader: ({ params }) => fetch(`https://socialbook-server.vercel.app/posts/${params._id}`)

            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    }
])
export default router;