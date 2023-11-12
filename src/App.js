import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { BASE_URL } from "./utils/constants/constants";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://react-http-movie-7c9a7-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
     
      const loadedMovies = []
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data [key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      setMovies(loadedMovies);
      
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[]);
  
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      'https://react-http-movie-7c9a7-default-rtdb.firebaseio.com/movies.json',
      {
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
          'Content-type': 'application/json',
      },
    },
    )
    const data = await response.json()
    console.log(data);
  }

  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p className="loader"></p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {console.log(movies)}

        {/* {isLoading && <p>...Loading</p>}
        {!isLoading && movies.length === 0 && <p>Found no movies</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        <MoviesList movies={movies} /> */}
      </section>
    </React.Fragment>
  );
}

export default App;

// function fetchMoviesHandler() {
//   fetch(`${BASE_URL}/films`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//      const transformedMovies = data.resault.map((movieData) =>{
//       return{
//         id: movieData.properties.episode_id,
//         title: movieData.properties.title,
//         openingText: movieData.properties.opening_crawl,
//         releaseDate: movieData.properties.release_date
//       }

//      })
//       setMovies(transformedMovies)
//     });
// }

//------------------------------------------------------------------------------------
 // const transformedMovies = data.result.map((movieData) => {
      //   return {
      //     id: movieData.properties.episode_id,
      //     title: movieData.properties.title,
      //     openingText: movieData.properties.opening_crawl,
      //     releaseDate: movieData.properties.release_date,
      //   };
      // });