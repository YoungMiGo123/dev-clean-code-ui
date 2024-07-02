import './App.css';
import Navbar from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';
import AppRoutes from './AppRoutes';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Core/Hooks/AuthHook';
import { useEffect, useState } from 'react';
import ProtectedRoute from './Core/Common/ProtectedRoute ';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('userToken');

    if (!userToken || userToken === 'undefined') {
      setLoggedIn(false);
      return;
    }

    setLoggedIn(true);
    console.log("Authenticated");
    console.log(userToken);
  }
  useEffect(() => {
    checkUserToken();
  }, [loggedIn]);


  return (
    <BrowserRouter>
      <AuthProvider>
        <>
          <Navbar />
          <div className="wrapper">
            <Sidebar />
            <div id="content-wrapper">
              <div className="container">
                <div className="video-block section-padding">
                  <div className="row">
                    <div className="col-md-12">
                      <Routes>
                        {AppRoutes.map((route, index) => {
                          const { path, element } = route;
                          return (
                            <ProtectedRoute>
                              <Route key={index} path={path} element={element} />
                            </ProtectedRoute>
                          );

                        })}
                      </Routes>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
