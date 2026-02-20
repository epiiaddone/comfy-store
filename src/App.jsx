import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';


//loaders
import { loader as landingLoader } from './pages/Landing';
import { loader as singleLoader } from './pages/SingleProduct';
import { loader as productsLoader } from './pages/Products';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as ordersLoader } from './pages/Orders';


//actions
import {default as registerAction} from './pages/Register';
import {default as loginAction} from './pages/Login';
import {default as checkoutAction} from './components/CheckoutForm';

import { ErrorElement } from './components';

import { store } from './store';

import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader, //this loader can be used by child elements when they call "useLoaderData()"
        errorElement: ErrorElement,
      },
      {
        path: 'products',
        element: <Products />,
        loader: productsLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singleLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about',
        element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),

      },
      {
        path: 'orders',
        element: <Orders />,
        loader: ordersLoader(store),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action:registerAction,
  },
]);



const App = ()=>{
  return(
   <RouterProvider  router={router}/>
  )
}
export default App