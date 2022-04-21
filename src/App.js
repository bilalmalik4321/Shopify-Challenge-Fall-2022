import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import PostOfTheDay from './PostOfTheDay';

import './App.css';

function App() {

    return (
      <Router>
        <div className="app">
          <div className="app__header">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h2 className="app__title">Spacetagram 🚀</h2>
              <h6 className="app__title_secondary">Welcome to Spacestagram!  Image-sharing from the final frontier, brought to you by NASA’s APOD image API.</h6>
            </Link>
          </div>
          <Routes>
            <Route path="/:date" element={<PostOfTheDay/>}/>
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
