
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import Moviedetails from "./pages/Moviedetails";
import MovieDescription from "./pages/MovieDescription";
function App() {
  // return <><Moviedetails/></>;
  return (
    <>

     <BrowserRouter>
      <Routes>
     
        <Route path="/" element = {<Moviedetails/>}/>
        <Route path="/movies/:movieId" element={<MovieDescription />} />
      </Routes>
    </BrowserRouter>


    </>
  );
}

export default App;
