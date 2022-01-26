import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    mainbox: {
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        padding: '15px'
    },
    title: {
      fontStyle:'bold'
    },
    img: {
        height: '275px',
        width: '200px'
    }
}

function imgErr(img) {
  img.src = 'noPoster.png';
  return true;
}

function MovieCard(props) {

    if(!props.title) {
        return null;
    }

    return (
        <div style={styles.mainbox}>
          <Link to={props.id ? "/details/"+props.id : '#'}>
          {props.image && props.image.includes("http") ?
            <img src={props.image} alt='' onError={({currentTarget}) => imgErr(currentTarget)} style={styles.img}/>
            :
            <img src="noPoster.png" alt='' style={styles.img}/>
          }
          </Link>
          <div style={styles.title}>
              {props.title}
          </div>
        </div>
    );
}

export default MovieCard;
