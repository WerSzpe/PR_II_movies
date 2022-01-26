
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { isExpired } from 'react-jwt';

import HomeScreen from './components/screens/Home';
import MovieDetails from './components/screens/MovieDetails';
import AddMovie from './components/screens/AddMovie';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import NotFound from './components/screens/NotFound';

function App() {
  const isLoggedIn = !isExpired(localStorage.getItem('token'));
  return (
    <div className="container-fluid">
      <div className='container'>
        <div className='content'>
          <Routes>

            {
              <>
              isLoggedIn ? (
                <Route path='/add' element={<AddMovie/>}/>
                <Route path='/details/:id' element={<MovieDetails/>}/>
              ) : (
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
              )
              </>
            }

            <Route path='/' element={<HomeScreen logged="isLoggedIn"/>}/>

            <Route path='/notFound' element={<NotFound/>}/>
            <Route path="*" element={<Navigate to ="/notFound" />}/>

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
