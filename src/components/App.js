import React, {useReducer, useEffect} from "react";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import initialState from "../state/initialState";
import reducer from "../state/reducer";

const API_KEY = "4a3b711b";

function App() {
    const [state,
        dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=Tenet&y=2020&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                (res.Response === "True")
                    ? dispatch({type: 'SEARCH_MOVIES_SUCCESS', payload: res.Search})
                    : dispatch({type: 'SEARCH_MOVIES_FAILURE', payload: res.Error});
            })
            .catch(err => dispatch({type: "SEARCH_MOVIES_FAILURE", payload: err}));
    }, []);

    const search = searchValue => {
        dispatch({type: "SEARCH_MOVIES_REQUEST"});

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                (res.Response === "True")
                    ? dispatch({type: 'SEARCH_MOVIES_SUCCESS', payload: res.Search})
                    : dispatch({type: 'SEARCH_MOVIES_FAILURE', payload: res.Error});
            })
            .catch(err => dispatch({type: "SEARCH_MOVIES_FAILURE", payload: err}));
    };

    const {loading, errorMessage, movies} = state;

    return (
        <div className="app">
            <Header title="React film search"/>
            <Search search={search}/>
            <div className="app-movies">
                {loading && !errorMessage
                    ? (
                        <span>loading...</span>
                    )
                    : errorMessage
                        ? (
                            <div className="app__error-msg">{errorMessage} Try again or change your query.</div>
                        )
                        : (movies.map((movie, index) => (<Movie key={`${index}-${movie.Title}`} movie={movie}/>)))}
            </div>
            <p className="app__footer">Powered by&nbsp;
                <a
                    href="http://www.omdbapi.com/"
                    className="app_footer-link"
                    target="_blank"
                    rel="noopener noreferrer">Omdbapi</a>
            </p>
        </div>
    );
}

export default App;
