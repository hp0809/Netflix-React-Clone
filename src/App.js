import React from "react";
import "./App.css";
import Row from "./Row.js";
import requests from "./requests.js";
import Banner from "./Banner.js";
import Navbar from "./Navbar.js";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow // automatically true
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      {/*<Row title="Top Rated" fetchUrl={requests.fetchTrending} /> //more or less the same as trending*/}
      <Row title="Action" fetchUrl={requests.fetchTopRated} />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
