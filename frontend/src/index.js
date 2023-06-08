import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

// import store from './store.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import 'bootstrap/dist/css/bootstrap.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);