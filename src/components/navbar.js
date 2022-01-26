  import React, { useState } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import {isExpired, decodeToken} from "react-jwt";

const Navbar = (props) => {

    const [user, setUser] = useState(decodeToken(localStorage.getItem('token')));
    const [isLoggedIn, setLoggedIn] = useState(!isExpired(localStorage.getItem('token')));

    const logout = async () => {
      const data = {};
      data.userId = user.userId;
      try{
        await fetch("https://pr-movies.herokuapp.com/api/user/logout/"+data.userId, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        localStorage.setItem('token', '');
        setLoggedIn(false);
        setUser(null);
        window.location.replace('/');
      }
      catch(error){
        console.log(error);
      }
    }

    return (
        <div className="nav-container">
            <ul className="nav nav-pills mb-3 ul-nav" id="pills-tab" role="tablist">

                <li className="nav-item" role="presentation">
                    <Link to="/" className="nav-link nav-point" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                            aria-controls="pills-home" aria-selected="true">Home</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link to="/movies" className="nav-link nav-point" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                            aria-controls="pills-home" aria-selected="true">Movies</Link>
                </li>
                <li className="nav-item" >
                    <img src='./film-128.png' alt='' />
                </li>
                <li>
                    <span className="app-title">YourMovi</span>
                </li>
                <li className="nav-item">
                    {
                      isLoggedIn ? (
                        <div className="log-box">
                          <button className="nav-point" id="btn-self" onClick={()=>{logout()}}>log out</button>
                          <Link to='/add' className="nav-link nav-point">add movie</Link>
                        </div>
                      ) : (
                          <div className="log-box">
                          <Link to='/signin' className="nav-link nav-point">log in</Link>
                          <Link to='/signup' className="nav-link nav-point">register</Link>
                          </div>
                      )
                    }
                </li>

               <div className="clear-float"></div>
            </ul>
        </div>
    );
};

export default Navbar;
