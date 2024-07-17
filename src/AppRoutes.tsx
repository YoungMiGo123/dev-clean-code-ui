import Dashboard from "./Features/Dashboard/Dashboard";
import UploadVideo from "./Features/Upload/Upload";
import Login from "./Features/Auth/Login";
import Register from "./Features/Auth/Register";
import CreateCurriculum from "./Features/Instructor/Curriculum"
const AppRoutes = [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/upload',
      element: <UploadVideo />
    },
    {
      path: '/login',
      element: <Login />
    }, 
    {
      path: '/register',
      element: <Register />

    },
    {
      path: '/curriculum' ,
      element: <CreateCurriculum />
    }
  ];
  
  export default AppRoutes;
  