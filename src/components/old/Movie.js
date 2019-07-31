import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './movie.css';


const Movie = (props) => {

const onSelectMovie = () => {
  console.log("movie element" + props.title);
  props.movieTitleCallbackinMovie(props.title);
}

const onAddMovie = ()=> {
  axios.post('http://localhost:3000/movies/',{
      title: props.title,
      overview : props.overview,
      release_date: props.release_date,
      inventory: 10,
      image_url: props.image_url,
      external_id: props.external_id
  })   
  .then((response) => {
   alert("Movie Added to Rental Library");
  })
  .catch((error) => {
    this.setState({ error: error.message });
  });
}

if (props.addMovie == true ){
  return (
    <div className="movie">
        <div className="movie__content-image_url"><img src={props.image_url} alt="new"/></div>
        <div className="movie__content">
          <div className="movie__content-title">{props.title}</div>
          <div className="movie__content-overview"><br/>{props.overview}</div>
          <div className="movie__content-release_date"><br/>Year Released: {props.release_date ? props.release_date.substr(0,4) : ''}</div>
        </div>
        <button onClick={onAddMovie}
        className="select__movie btn btn-primary">
        Add to Library 
        </button>
      </div>
)
}
else {
  return (
    <div className="movie">
        <div className="movie__content-image_url"><img src={props.image_url} alt="new"/></div>
        <div className="movie__content">
          <div className="movie__content-title">{props.title}</div>
          <div className="movie__content-overview"><br/>{props.overview}</div>
          <div className="movie__content-release_date"><br/>Year Released: {props.release_date ? props.release_date.substr(0,4) : ''}</div>
        </div>
        <button onClick={onSelectMovie}
        className="select__movie btn btn-primary">
          Select Movie 
        </button>

      </div>
    )
  }
}

Movie.propTypes = {
    id:PropTypes.number,
    title:PropTypes.string,
    overview:PropTypes.string,
    release_date:PropTypes.string,
    image_url:PropTypes.string,
    external_id:PropTypes.number,
    movieTitleCallback: PropTypes.func,
    
};
  
  export default Movie;