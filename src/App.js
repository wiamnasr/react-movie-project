import React from "react";

// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";

// Styles:
import { GlobalStyle } from "./GlobalStyle";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      {/* creating a route param by specifying a colon, named it movieId */}
      <Route path='/:movieId' element={<Movie />} />
      {/* Showing the NotFound component on any other route that doesn't exist */}
      <Route path='/*' element={<NotFound />} />
    </Routes>
    <GlobalStyle />
  </Router>
);

export default App;
