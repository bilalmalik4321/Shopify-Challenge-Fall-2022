import React from 'react';
import './Post.css'

function Post({imageUrl, title, date, description}) {
    console.log(description);
  return (
    <div className="post">

        <img className="post__image" src={imageUrl} alt=""/>

        <h4 className="post__text"><strong>{title}</strong> - {date}</h4>

        <p className="post__description">{description}</p>

    </div>
  )
}

export default Post
