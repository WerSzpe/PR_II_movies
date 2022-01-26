import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import Navbar from "../navbar";

const MovieDetails = (props) => {

    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
      const getMovie = async () => {
        try {
          const res = await fetch("https://pr-movies.herokuapp.com/api/movies/"+id);
          const data = await res.json();
          setMovie(data);
        } catch (error) {
          console.log(error);
        } finally {
          setUpdated(true);
        }
      }
      getMovie();
    },[id])

    return (
      <div className="jumbotron jumbotron-fluid">
        <Navbar/>
        <div id='movieDetailsBox'>
            {updated ? (
              <>
                <div>{movie.title ? movie.title : 'Not found'}</div>
                <div>{movie.content ? movie.content : 'There is nothing about that movie here'}</div>

              </>
            ) : null  }
        </div>
    </div>
  )
 };

 export default MovieDetails;
