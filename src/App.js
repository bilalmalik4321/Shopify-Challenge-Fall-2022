import React, { useState, useEffect } from 'react';
import Post from "./Post";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [prevDate,setPrevDate] = useState(null);

  const getPicturesOfTheDay = (date,prevDate) => {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api.nasa.gov/planetary/apod?api_key=2qVz23V8TI2JlXzCHSns9e6C3E3psJMPxylS5EEJ&start_date="+prevDate+"&end_date="+date, requestOptions)
        .then(response => response.text())
        .then(results => {
          results = JSON.parse(results);
          console.log(results);
          let localPosts = posts;
          
          results.forEach((result) => {
            localPosts = [...localPosts, {
              title: result["title"],
              date: result["date"],
              imageUrl: result["url"],
              description: result["explanation"]
            }]
          });

          localPosts.reverse();
          setPosts(localPosts);
          setLoading(false);
        })
        .catch(error => console.log('error', error));
    }

  useEffect(()=>{

    setLoading(true);
    let rawDate;
    let formattedDate;

    //if we havent set a date (first time on component) we set the date as todays date
    if(prevDate === null) rawDate = new Date();
    else rawDate = prevDate;

    formattedDate = rawDate.toISOString().split('T')[0];
    rawDate.setDate(rawDate.getDate() - 4);
    let formattedPrevDate = rawDate.toISOString().split('T')[0];

    getPicturesOfTheDay(formattedDate,formattedPrevDate);

    //set one dy prior, use as reference when getting new images
    rawDate.setDate(rawDate.getDate() - 1);
    setPrevDate(rawDate);
  },[]);

  return (
    <div className="app">
      <div className="app__header">
        <h2>Spacetagram</h2>
      </div>

      <div className="app__body">
        <div className="app__welcome_posts_mobile">
          <div className="app__welcome_section">
            <h2>
              Welcome 👋
            </h2>
            <p>
              Welcome to Spacestagram! 🚀 Image-sharing from the final frontier, brought to you by NASA’s APOD image API.
            </p>
          </div>
          <div>
            <h2 className="app__post_heading">Posts</h2>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              ):(
                <>
                  {
                    posts.map((post,index) => (
                      <Post key={index} title={post.title} date={post.date} imageUrl={post.imageUrl} description={post.description} />
                    ))
                  }
                </>
              )
            }
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
