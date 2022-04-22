import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from "./Post";
import './postOfTheDay.css';

const PostOfTheDay = () => {

    //get date form route (/2022-04-21)
    const { date } = useParams();
    const [post, setPost] = useState({});

    //function to get a single image from the POTD api
    const getPicturesOfTheDay = (date) => {
        // create headers
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          //use fetch request to get new post
          fetch("https://api.nasa.gov/planetary/apod?api_key=2qVz23V8TI2JlXzCHSns9e6C3E3psJMPxylS5EEJ&date="+date, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                console.log(result);
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                
                let rawDate = result["date"].split("-");
                let date = months[ parseInt(rawDate[1])-1 ] + " "+ rawDate[2] + " "+ rawDate[0];
                let newPost = {
                    title: result["title"],
                    date: date,
                    imageUrl: result["url"],
                    description: result["explanation"]
                };
                setPost(newPost);

            })
            .catch(error => console.log('error', error));
    }


    useEffect(()=>{
        //on first render, get the pertaining image object to the specfific date
        getPicturesOfTheDay(date);
    },[])

  return (
    <div className="potd">
      <Post  title={post.title} date={post.date} imageUrl={post.imageUrl} description={post.description} />
    </div>
  )
}

export default PostOfTheDay
