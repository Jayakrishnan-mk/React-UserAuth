import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Secret from './pages/Secret'
import "react-toastify/dist/ReactToastify.css"

import Ad_Login from './pages/Ad_Login';
import Ad_Register from './pages/Ad_Register';
import Ad_Secret from './pages/Ad_Secret';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route exact path='/register' element={<Register />} />
    <Route exact path='/login' element={<Login />} />
    <Route exact path='/' element={<Secret />} />

    <Route exact path='/admin-login' element={<Ad_Login />} />
    <Route exact path='/admin-register' element={<Ad_Register />} />
    <Route exact path='/admin' element={<Ad_Secret />} />
  </Routes>
  </BrowserRouter>
  )
}

export default App;