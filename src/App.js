import React, { useState, useEffect } from 'react';
import Post from "./Post";

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [prevDate, setPrevDate] = useState(new Date());

  const removeDuplicates = (arr) => {
    const uniqueDates = [];

    const unique = arr.filter(element => {
      const isDuplicate = uniqueDates.includes(element.date);
    
      if (!isDuplicate) {
        uniqueDates.push(element.date);
    
        return true;
      }
    });

    unique.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });

    return unique;
  }

  const getPicturesOfTheDay = (startDate, prevPosts) => {
    
    setLoading(true);

    let rawDate = startDate;

    //format date to YYYY-MM-DD format
    let formattedDate = rawDate.toISOString().split('T')[0];
    console.log(formattedDate);
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
          let newPosts = prevPosts;
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

          newPosts = removeDuplicates(newPosts);
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
      if( (e.target.documentElement.scrollTop + window.innerHeight + 1 >= e.target.documentElement.scrollHeight) ) {
        console.log(prevDate);
        getPicturesOfTheDay(prevDate, posts);
      }
    }

    useEffect(()=>{
      console.log("first call");
      getPicturesOfTheDay(prevDate, posts);

      window.addEventListener("scroll", handleScroll);
    },[]);

    useEffect(()=>console.log(currDate),[currDate])

    return (
      <div className="app">
        <div className="app__header">
          <h2 className="app__title">Spacetagram 🚀</h2>
          <h6 className="app__title_secondary">Welcome to Spacestagram!  Image-sharing from the final frontier, brought to you by NASA’s APOD image API.</h6>
        </div>

        <div className="app__body">

          <div className="app__welcome_posts_mobile">
            <div>
              <div className="app__post_heading_container">

                <h2 className="app__post_heading">Posts</h2>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Images starting from"
                    value={currDate}
                    minDate={new Date('1995-06-16')}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setPrevDate(newValue);
                      console.log(currDate);
                      setCurrDate(newValue);
                       console.log(currDate);
                      setPosts([]);
                      getPicturesOfTheDay(newValue, []);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

              </div>
              {
                posts.map((post,index) => (
                  <div key={index} className="app__post_container">
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
