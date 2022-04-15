import React, { useState, useEffect } from 'react';
import './App.css';
import Post from "./Post";

function App() {

  const [posts, setPosts] = useState([]);

  const getPicturesOfTheDay = () => {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api.nasa.gov/planetary/apod?api_key=2qVz23V8TI2JlXzCHSns9e6C3E3psJMPxylS5EEJ&start_date=2022-04-10&end_date=2022-04-15", requestOptions)
        .then(response => response.text())
        .then(results => {
          results = JSON.parse(results);
          console.log(results);
          let localPosts = posts;
          
          results.forEach((result) => {
            console.log(result);
            localPosts = [...localPosts, {
              title: result["title"],
              date: result["date"],
              imageUrl: result["url"],
              description: result["explanation"]
            }]
          });

          setPosts(localPosts);
        })
        .catch(error => console.log('error', error));
    }

  useEffect(()=>{
    getPicturesOfTheDay();
  },[]);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <h1>Hi</h1>

      {
        posts.map((post,index) => (
          <Post key={index} title={post.title} date={post.date} imageUrl={post.imageUrl} description={post.description}/>
        ))
      }

    </div>
  );
}

export default App;
