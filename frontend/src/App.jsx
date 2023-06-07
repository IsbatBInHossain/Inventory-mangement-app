import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPass';
import Reset from './pages/auth/Reset';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:resetToken' element={<Reset />} />
        <Route
          path='/dashboard'
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
