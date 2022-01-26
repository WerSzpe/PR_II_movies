import React, { useState, useEffect } from "react";

import Navbar from "../navbar";
import MovieCard from "./MovieCard";


const HomeScreen = (props) => {

    const [allMovies, setAllMovies] = useState([]);

    const getAllMovies = async () => {
        try{
            const movies = await (await fetch('https://pr-movies.herokuapp.com/api/movies')).json();
            setAllMovies(movies);
            console.log(allMovies);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllMovies();
    },[]);

    return (
        <div className="jumbotron jumbotron-fluid">
            <Navbar/>

            <div className="container">
              <div style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontStyle:'italic'}}>
                <blockquote cite="https://www.brainyquote.com/quotes/jeanluc_godard_161264?src=t_cinema">
                  Cinema is the most beautiful fraud in the world.
                </blockquote>
              </div>
                {allMovies.map(mov => (

                    <div key={mov.id} style={{float:'left'}}>
                        <MovieCard id={mov.id} title={mov.title} image={mov.image} content={mov.content}/>
                    </div>

                ))}

            </div>
        </div>
    )
 };

 export default HomeScreen;
