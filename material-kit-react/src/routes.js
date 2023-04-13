import { Navigate, useRoutes } from 'react-router-dom';
import { element } from 'prop-types';
// layouts
import DashboardLayout from './layouts/dashboard/crcDashboard';
import UserDashboardLayout from './layouts/dashboard/userDashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AllStudentsPage from './pages/AllStudentsPage'; 
import AddStudent from './pages/AddStudent';
import Companies from './pages/Companies';
import Jobs from './pages/jobs'; 
import UserJobs from './pages/userpage/jobs'; 
import CrcLogin from './pages/crcLoginPage';
import UserDashboard from './pages/userpage/userDashboard';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([

    {
      path: '/login',
      element: <LoginPage />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'all-students', element: <AllStudentsPage /> },
        { path: 'add-student', element: <AddStudent/> }, 
        {path: 'companies', element: <Companies/>},
        {path: 'jobs', element: <Jobs/> },
        {path: 'userpage/jobs', element: <UserJobs/>}
      ],
    },
    {
      path: '/userDashboard',
      element: <UserDashboardLayout/>,
      children: [
        { element: <Navigate to="/userDashboard/app" />, index: true },
        { path: 'app', element: <UserDashboard /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        {path: 'jobs', element: <Jobs/> },
        {path: 'userpage/jobs', element: <UserJobs/>}
      ]
    },
    {
      path: '/crclogin',
      element: <CrcLogin />
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
