import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';


export default class Main extends Component {
    state = {
        movies: [],
        page: 1,
    }

    componentDidMount() {
        this.loadMovies();
    }

    loadMovies = async (page = 1) => {
        const response = await api.get(`/movies/${page}?sort=last%20added&order=-1`);

        this.setState({ movies: response.data, page });
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadMovies(pageNumber);
    }

    nextPage = () => {
        const { page } = this.state;

        const pageNumber = page + 1;

        this.loadMovies(pageNumber);
    }

    render() {
        const { movies, page } = this.state;

        return (
            <div className="movie-list">
                <div class="container">
                    <div class="row">
                        {movies.map(movie => (
                            <div class="col s3" key={movie._id}>
                                <div class="card">
                                    <div class="card-image">
                                        <img src={movie.images.poster} alt="movie-poster" />
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content">
                                            <p><b>{movie.title}</b></p>
                                        </div>
                                        <div class="card-action">
                                        <Link to={`/movies/${movie._id}`}>Acessar</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="actions">
                    <a class="waves-effect waves-light btn" disabled={page === 1} onClick={this.prevPage}>Anterior</a>
                    <a class="waves-effect waves-light btn" onClick={this.nextPage}>Próximo</a>
                </div>
            </div>
        );
    }


}