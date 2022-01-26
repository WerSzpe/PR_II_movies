import React, { useState } from "react";
import Navbar from "../navbar";
import axios from 'axios';
import './AddMovieCss.css';

const AddMovie = (props) => {
  const [data, setData] = useState({
    title: '',
    img: '',
    content: ''
  });

  const add = async () => {
    const changingBox = document.getElementById('changingBox');

    if (data.title.trim() ==='' || data.content.trim() === '') {
          changingBox.innerText = "Fill all of the boxes";
          return;
    }

    try {
      await fetch("https://pr-movies.herokuapp.com/api/movies", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      changingBox.innerText = 'Added to database';
    } catch (error) {
      changingBox.innerText = 'Something is wrong. Please try again later';
      console.log(error);
    }
  }

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <Navbar/>
        <div className="addBox">
        <h1 className="display-4" id='changingBox'>Add a movie</h1>

        <input value={data.title}
               id = 'inputTitle'
               placeholder = 'Movie title'
               onChange={(input) => {
                 setData({title:input.target.value, image:data.image, content:data.content});
               }}
        />

        <input value={data.image}
               id = 'inputImage'
               placeholder = 'Movie poster link'
               onChange={(input) => {
                 setData({title:data.title, image:input.target.value, content:data.content});
               }}
        />

        <textarea value={data.content}
               id = 'inputContent'
               placeholder = 'Movie description'
               onChange={(input) => {
                 setData({title:data.title, image:data.image, content:input.target.value});
               }}
        ></textarea>

        <button onClick={add} id="butt">Add a movie</button>
        </div>
      </div>
    </div>
  )
 };

 export default AddMovie;
