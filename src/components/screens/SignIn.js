import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import './signIn.css';
import axios from "axios";

const SignIn = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = async() => {
      if (username.trim() === '') {
          setErrors({username:'username is requiredh'});
      }
      if (password.trim() === '') {
          setErrors({password:'password is requiredh'});
      }

      return Object.keys(errors).length === 0 ? null : errors;
    };

    const login = async (event) => {
        event.preventDefault();

        console.log(validate());

        axios({
            method: 'post',
            url: 'https://pr-movies.herokuapp.com/api/user/auth',
            data: {
                login: username,
                password:password
            }
        }).then((response) => {
          const resData = response;
          console.log(resData.data);
          localStorage.setItem('token', resData.data.token);
          window.location.replace('/');
        }).catch((error) => {
          const errors = {};
          setErrors({username:'username is required'});
          setErrors(errors || null);
          console.log(error);
        })
    }

    return (
        <div className="container">
            <div className="top-row">
                <Link to="/" className="go-back">Go back home</Link>
                <div className="title">Sign in</div>
                <div className="clear-float"></div>
            </div>

            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input name="username"
                            type='text'
                            className="form-control"
                            placeholder="username"
                            onChange={(input) => setUsername(input.target.value)}
                            value={username}
                            />
                    {errors.username &&
                    <div className="alert alert-danger">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password"
                            type='password'
                            className='form-control'
                            placeholder="password"
                            onChange={(input) => setPassword(input.target.value)}
                            value={password}
                            />
                    {errors.password &&
                    <div className="alert alert-danger">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => login(event)}>Sign In</button>
            </form>

        </div>
    );
 };

 export default SignIn;
