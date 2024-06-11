const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.port;
const  Movie = require('./models/movie.model');
//database connection 
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('database connected successfully')
    } catch (error) {
        console.log(error)
    }
}
//middlewares
app.use(bodyParser.json());
app.use(cors())



//upload movies
app.post('/movies', async (req, res) => {
  const { name, description, image } = req.body;

  if (!name || !description || !image) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  try {
    const newMovie = new Movie({ name, description, image });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies); // Send the movies data as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error message on failure
  }
});

//get movies by id 
app.get('/api/movies/:movieId', async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' }); // Handle non-existent movie
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});


app.listen(port, (req, res) => {
    dbConnection();
    console.log(`Server is running on the port ${port}`)

})