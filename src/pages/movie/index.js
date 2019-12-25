import React, { Component } from 'react';
import api from "../../services/api"


export default class Movie extends Component {
    state = {
        movie: {},
        movieImg: {},
        movieRat: {},
        movieGen: [],
        movieTor: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/movie/${id}`);

        this.setState({ movie: response.data, movieImg: response.data.images, movieRat: response.data.rating, movieGen: response.data.genres, movieTor: response.data.torrents.en['1080p'] })

        console.log(this.state)
    }

    render() {
        const { movie, movieImg, movieRat, movieGen, movieTor} = this.state;

        return (
            <div class="container">
                <img src={movieImg.fanart} alt="movie-fanart" />

                <h1>{movie.title}</h1>
                <ul>
                    <li>
                        <p><b>Genres</b>: {movieGen.map(genre => genre).join(', ')}.</p>    
                    </li>
                    <li><b>Year</b>: {movie.year}</li>
                    <li><b>Runtime</b>: {movie.runtime} min</li>
                    <li><b>Rating</b>: {movieRat.percentage}%</li>
                </ul>
                <p><b>Synopsis: </b>{movie.synopsis}</p>
                <a href={movieTor.url}>Link download magnet</a>


            </div>
        )
    }
}