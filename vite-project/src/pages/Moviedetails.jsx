import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from "semantic-ui-react";
const Moviedetails = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:8000/api/movies");
        setMovies(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
         <h1>PathBeat ai</h1> 
      {isLoading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 ? (
        <ul className="ui grid">
          {movies.map((movie) => (
            <li key={movie._id}>
              <Card>
                <Image src={movie.image} alt={movie.name} wrapped ui={false} />
                <CardContent>
                  <CardHeader>{movie.name}</CardHeader>
                  <CardDescription>
                     {movie.description.slice(0, 20)+'...'}
                    <Link to={`/movies/${movie._id}`}>
                     "Read more"
                    </Link>
                  </CardDescription>
                </CardContent>
              </Card>
              {/* <h2>{movie.name}</h2>
              <img src={movie.image} alt={movie.name} />

              <Link to={`/movies/${movie._id}`}>
                {" "}
                <p>{movie.description.slice(0, 10) + " ...Read more"}</p>
              </Link> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default Moviedetails;
