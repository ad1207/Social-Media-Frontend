import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/Home';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Home } from '@mui/icons-material';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={user?<HomePage/>:<Navigate to="/login"/>}/>
      <Route path='/login' element={user?<Navigate to="/"/>:<Login/>}/>
      <Route path='/register' element={user?<Navigate to="/"/>:<Register/>}/>
      <Route path='/profile/:username' element={user?<Profile/>:<Navigate to="/login"/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
