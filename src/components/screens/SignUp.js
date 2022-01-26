import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const styles = {
  topRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  goBack:{
    flex:'1',
    color: '#091638',
    textDecoration: 'none',
    float: 'left',
    padding: '10px',
    margin:'15px'
  },
  title: {
    flex:'2',
    float: 'left',
    padding: '10px',
    margin:'15px',
    fontSize: '20px'
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

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const validate = async () => {
        if (username.trim() === '') {
            setErrors({username:'username is requiredh'});
        }
        if (email.trim() === '') {
            setErrors({email:'email is requiredh'});
        }
        if (password.trim() === '') {
            setErrors({password:'password is requiredh'});
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(validate());

        axios({
            method: 'post',
            url:'https://pr-movies.herokuapp.com/api/user/create',
            data: {
                name: username,
                email: email,
                password: password
            }
        }).then((response) => {
            window.location.replace('/');
        }).catch((error) => {
            const errors = {};
            setErrors({username:'username is required'});
            setErrors(errors || null);
            console.log(error);
        })
    }


    return (
        <div className="jumbotron jumbotron-fluid">
            <div style={styles.container}>
                <div style={styles.topRow}>
                  <Link to="/" style={styles.goBack}>Go back home</Link>
                  <h1 style={styles.title}>Sign up</h1>
                </div>
                <div style={styles.boxOfInput}>
                    <label htmlFor="username">Name</label>
                    <input value={username}
                            onChange={(input) => setUsername(input.target.value)}
                            name="username"
                            type="text"
                            style={styles.inputBox}
                            id="username"
                            aria-describedby="emailHelp"
                            placeholder="Username"/>
                    {errors.username &&
                    <div className="alert alert-danger">{errors.username}</div>}
                </div>
                <div style={styles.boxOfInput}>
                    <label htmlFor="email">Email address</label>
                    <input value={email}
                            onChange={(input) => setEmail(input.target.value)}
                            name="email"
                            type="email"
                            style={styles.inputBox}
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Email"/>
                    {errors.email &&
                    <div className="alert alert-danger">{errors.email}</div>}
                </div>
                <div style={styles.boxOfInput}>
                    <label htmlFor="password">Password</label>
                    <input value={password}
                            onChange={(input) => setPassword(input.target.value)}
                            name="password"
                            type="password"
                            style={styles.inputBox}
                            id="password"
                            placeholder="Password"/>
                    {errors.password &&
                    <div className="alert alert-danger">{errors.password}</div>}
                </div>
                <div style={styles.boxOfInput}>
                  <button style={styles.btt} onClick={(event)=>handleSubmit(event)}>SignUp</button>
                </div>
            </div>
        </div>
    )
 };

 export default SignUp;
