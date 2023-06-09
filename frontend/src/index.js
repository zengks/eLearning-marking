import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import store from './store.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import StudentScreen from './screens/StudentScreen';
import InstructorScreen from './screens/InstructorScreen';
import ProtectRoute from './components/ProtectRoute';
import InstructorProtect from './components/InstructorProtect';
import MarkAssignmentScreen from './screens/MarkAssignmentScreen';
import PageNotFound from './screens/PageNotFound';

import 'bootstrap/dist/css/bootstrap.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path='/login' element={<LoginScreen />} />

      <Route path="" element={<InstructorProtect />}>
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/instructor' element={<InstructorScreen />} />
        <Route path='/instructor/assignments/:studentId' element={<MarkAssignmentScreen />} />
      </Route>

      <Route path="" element={<ProtectRoute />}>
        <Route path='/assignments/:studentId' element={<StudentScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);