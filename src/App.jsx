import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loader as landingLoader } from './pages/Landing';
import { loader as singleLoader } from './pages/SingleProduct';
import { loader as productsLoader } from './pages/Products';

import {default as registerAction} from './pages/Register';

import { ErrorElement } from './components';

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
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
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