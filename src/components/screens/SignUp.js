import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
            <div className="container">
                <Link to="/"><button>Go back home</button></Link>
                <h1 className="display-4">Sign up login email password</h1>

                <div>
                    <label htmlFor="username">Name</label>
                    <input value={username}
                            onChange={(input) => setUsername(input.target.value)}
                            name="username"
                            type="text"
                            className="form-control"
                            id="username"
                            aria-describedby="emailHelp"
                            placeholder="Username"/>
                    {errors.username &&
                    <div className="alert alert-danger">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input value={email}
                            onChange={(input) => setEmail(input.target.value)}
                            name="email"
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Email"/>
                    {errors.email &&
                    <div className="alert alert-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={password}
                            onChange={(input) => setPassword(input.target.value)}
                            name="password"
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"/>
                    {errors.password &&
                    <div className="alert alert-danger">{errors.password}</div>}
                </div>
                <button className="btn btn-primary" onClick={(event)=>handleSubmit(event)}>SignUp</button>

            </div>
        </div>
    )
 };

 export default SignUp;
