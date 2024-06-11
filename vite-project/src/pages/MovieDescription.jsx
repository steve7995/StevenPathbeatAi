import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDescription = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:8000" + `/api/movies/${movieId}`
        );
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]); // Re-fetch on movie ID change

  return (
    <div>
   
      {isLoading && <p>Loading movie details...</p>}
      {error && <p>Error: {error}</p>}
      {movie && (
        <>
          <div class="ui raised very padded text container segment">
            <h2 class="ui header">Movie Details</h2>

            <h3>{movie.name}</h3>
            <img
              className=" ui medium image"
              src={movie.image}
              alt={movie.name}
            />
            <p>{movie.description}</p>
            <p></p>
            <Link to={"/"}>
              <button class="ui primary button">Home</button>
            </Link>
          </div>
        </>
      )}
      {!movie && !isLoading && <p>Movie not found.</p>}
    </div>
  );
};

export default MovieDescription;
