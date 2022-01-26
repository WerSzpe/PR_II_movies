import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const styles={
  topRow :{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
  },
  goBack : {
      flex:'1',
      color: '#091638',
      textDecoration: 'none',
      float: 'left',
      padding: '10px',
      margin:'15px'
  },
  title :  {
      flex:'2',
      float: 'left',
      padding: '10px',
      margin:'15px',
      fontSize: '20px'
  },
  clearFloat: {
      clear: 'both'
  },
  boxOfInput: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    padding:'5px'
  },
  inputBox: {
    width:'50%',
    paddingTop:'10px',
    paddingBottom:'10px',
    marginTop:'10px',
    marginBottom:'10px',
  },
  btt: {
    width:'25%',
    height:'60px',
    fontSize:'20px'
  }
}

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
            <div style={styles.topRow}>
                <Link to="/" style={styles.goBack}>Go back home</Link>
                <div style={styles.title}>Sign in</div>
                <div style={styles.clearFloat}></div>
            </div>

            <form>
                <div style={styles.boxOfInput}>
                    <label htmlFor="username">Username</label>
                    <input name="username"
                            type='text'
                            style={styles.inputBox}
                            placeholder="username"
                            onChange={(input) => setUsername(input.target.value)}
                            value={username}
                            />
                    {errors.username &&
                    <div className="alert alert-danger">{errors.username}</div>}
                </div>
                <div style={styles.boxOfInput}>
                    <label htmlFor="password">Password</label>
                    <input name="password"
                            type='password'
                            style={styles.inputBox}
                            placeholder="password"
                            onChange={(input) => setPassword(input.target.value)}
                            value={password}
                            />
                    {errors.password &&
                    <div className="alert alert-danger">{errors.password}</div>}
                </div>
                <div style={styles.boxOfInput}>
                  <button type="submit" style={styles.btt} onClick={(event) => login(event)}>Sign In</button>
                </div>
            </form>

        </div>
    );
 };

 export default SignIn;
