import React, { Component } from 'react';
import Customer from './Customer';
import CustomerList from './CustomerList';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie.js';
import './movie.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            error: '',
        };
    }

    componentDidMount() {
      this.getSearch()
    }

    getSearch = () => {
        console.log(this.props.location)
        axios.get(`http://localhost:3000/movies${this.props.location.search}`)
        .then((response) => {
         this.setState({ searchResults: response.data });
          })
          .catch((error) => {
            this.setState({ error: error.message });
          });
    }

    render() {
    const allMovies = this.state.searchResults.map((movie) => {
        return <Movie
        addMovie={true}
        key={movie.id}
        title={movie.title}
        overview={movie.overview}
        release_date={movie.release_date}
        image_url={movie.image_url}
        external_id={movie.external_id}/>
      });

    return (
        <div>
        <div className="library">
           {allMovies} 
        </div>
        </div>
    )
  }
}

Search.propTypes = {

};

export default Search;




    

