import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios'
import { movies } from './getMovies';

export default class Movies extends Component {
    constructor() {
        super();
        //For addding functionality of button upon hovering or when the mouse enters, hover is used and parr is used for the pagination at the bottom
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1, //for keeping track of current page
            movies: [], //For storing the movies state
            favourites: [] //For storing id's to keep the track of movies added to favourites
        }
        // console.log('constructor called');
    }

    //await for waiting till the get request is fetched
    async componentDidMount() {
        // console.log('mounting done 1');
        //Side effects
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fb76d9d59d0269dba650de7db47692e4&language=en-US&page=${this.state.currPage}`)

        let data = res.data;
        this.setState({
            movies: [...data.results]
        })


        // // console.log(data);
        // console.log('mounting done 2');
    }
    //for changing the movies array,upon different clicks
    changeMovies = async () => {
        console.log('change movies called', this.state.parr, this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fb76d9d59d0269dba650de7db47692e4&language=en-US&page=${this.state.currPage}`)

        let data = res.data;
        this.setState({
            movies: [...data.results]
        })
    }

    //Function for the next page
    handleRight = () => {
        //creating an array for increasing parr in the bottom
        // console.log('Right called');
        let temparr = []
        for (let i = 0; i <= this.state.parr.length; i++) {
            temparr.push(i + 1);
        }
        //setState function in Asynchronous so here we are passing changeMovies Fn definiton stating ki, jb setState ka kaam khatam ho jaye tho changeMOvies ko call kr dena
        this.setState({
            parr: [...temparr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)

    }

    //Function for the previous page
    handleLeft = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }

    }

    handleClick = (value) => {
        console.log(value);
        //Move to different page only when you're not in the same page
        if (value != this.state.currPage) {
            this.setState({
                currPage: value
            }, this.changeMovies)
        }


    }

    //To store in the localstorage upon clicking Add to Favourites
    handleFavourites = (movie) => {
        //AS in localstorage values are stored in the form of string
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        // console.log("old Data",oldData);

        //condition for adding as well as deleting movies from local storage
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((m) => m.id != movie.id)
        } else {
            oldData.push(movie)
        }
        localStorage.setItem("movies-app", JSON.stringify(oldData));
        // console.log("Updated",oldData);
        this.handleFavouritesState()
    }

    handleFavouritesState = () => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        let temp = oldData.map((movie) => movie.id)
        this.setState({
            favourites: temp
        })
    }
    render() {
        // let movie = movies
        // console.log(this.state.movies);
        // console.log('render');
        return (
            <>
                {
                    this.state.movies.length == 0 ? <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> :
                        <div>
                            <h3 className="text-center"><strong />Trending</h3>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.original_title} />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                            {/* <p className="card-text movies-text">{movieObj.overview}</p> */}

                                            <div className="button-wrapper" style={{ display: "flex", width: "100%", justifyContent: "center" }}>

                                                {
                                                    //Display the button Add to Favourites only when the hover id is same as the movieObj id
                                                    //handleFavourites is created for storing it on the local storage
                                                    this.state.hover === movieObj.id &&
                                                    <a className="btn btn-primary movies-button" onClick={() => this.handleFavourites(movieObj)}>
                                                        {this.state.favourites.includes(movieObj.id) ? "Remove from favourites" : "Add to favourites"}
                                                    </a>
                                                }

                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {/* Pagination code from bootstrap */}
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.parr.map((value) => (<li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)} >{value}</a></li>))
                                        }
                                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }

            </>
        )
    }
}

