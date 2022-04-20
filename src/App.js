import React, { useState, useEffect } from 'react';
import Post from "./Post";

// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevDate, setPrevDate] = useState(new Date());

  const getPicturesOfTheDay = () => {
    
    setLoading(true);

    let rawDate = prevDate;

    //format date to YYYY-MM-DD format
    let formattedDate = rawDate.toISOString().split('T')[0];
    //go four days back (we want five posts per batch of images call)
    rawDate.setDate(rawDate.getDate() - 4);
    let formattedPrevDate = rawDate.toISOString().split('T')[0];

    //set headers for request
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      //run fetch reauest, than parse data
      fetch("https://api.nasa.gov/planetary/apod?api_key=2qVz23V8TI2JlXzCHSns9e6C3E3psJMPxylS5EEJ&start_date="+formattedPrevDate+"&end_date="+formattedDate, requestOptions)
        .then(response => response.text())
        .then(results => {
          results = JSON.parse(results);
          results.reverse();
          console.log(results);
          let newPosts = posts;
          var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          
          results.forEach((result) => {
            if(!result["url"].includes("youtube")){
              let rawDate = result["date"].split("-");
              let date = months[ parseInt(rawDate[1])-1 ] + " "+ rawDate[2] + " "+ rawDate[0];
              newPosts.push({
                title: result["title"],
                date: date,
                imageUrl: result["url"],
                description: result["explanation"]
              });

            }
          });

          console.log(posts);
          setPosts(newPosts);
          setLoading(false);
          console.log(loading);
          //set one day prior, use as reference when getting new images (don't want to get same day again)
          rawDate.setDate(rawDate.getDate() - 1);
          console.log(rawDate);
          setPrevDate(rawDate);

        })
        .catch(error => console.log('error', error));
      
    }

    const handleScroll = (e) => {
      if( (e.target.documentElement.scrollTop + window.innerHeight + 1 >= e.target.documentElement.scrollHeight) ) getPicturesOfTheDay();
    }

    useEffect(()=>{
      console.log("first call");
      getPicturesOfTheDay();

      window.addEventListener("scroll", handleScroll);
    },[]);

    return (
      <div className="app">
        <div className="app__header">
          <h2 className="app__title">Spacetagram 🚀</h2>
          <h6 className="app__title_secondary">Welcome to Spacestagram!  Image-sharing from the final frontier, brought to you by NASA’s APOD image API.</h6>
        </div>

        <div className="app__body">

          <div className="app__welcome_posts_mobile">
            <div>
              <h2 className="app__post_heading">Posts</h2>
              {
                posts.map((post,index) => (
                  <div key={index} className="app__post-container">
                    <Post  title={post.title} date={post.date} imageUrl={post.imageUrl} description={post.description} />
                  </div>
                ))
              }
              {loading && 
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-around' }}>
                      <CircularProgress />
                    </Box>
              }
            </div>
          </div>

        </div>

      </div>
    );
}

export default App;
