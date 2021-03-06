import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import Navbar from "../navbar";

const styles= {
  movieDetailsBox: {
    display:'flex',
    alignItems:'center',
    flexDirection:'row'
  },
  textBoxes:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  title : {
    padding:'10px',
    fontSize:'60px',
    fontStyle:'italic'
  },
  content: {
    padding:'15px',
    fontSize:'15px',
    margin:'50px'
  },
  img: {
    flexDirection:'row',
    width:'400px',
    height:'600px'
  }
}

function imgErr(img) {
  img.src = 'noPoster.png';
  return true;
}

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
        <div style={styles.movieDetailsBox}>
            {updated ? (
              <>
                <img src={movie.image} alt='' onError={({currentTarget}) => imgErr(currentTarget)} style={styles.img}/>
                <div style={styles.textBoxes}>
                  <div style={styles.title}>{movie.title ? movie.title : 'Not found'}</div>
                  <div style={styles.content}>{movie.content ? movie.content : 'There is nothing about that movie here'}</div>
                </div>
              </>
            ) : null  }
        </div>
    </div>
  )
 };

 export default MovieDetails;
