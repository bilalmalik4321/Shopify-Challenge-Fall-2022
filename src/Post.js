import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import './Post.css'

function Post({imageUrl, title, date, description}) {
    console.log(description);
  return (
    <div className="post">

        <img className="post__image" src={imageUrl} alt=""/>
        
        <div className="post__footer">
            <div className="post__footer_lead">
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} 
                            checkedIcon={<Favorite />}
                    name="checkedH" />}
                />
                <h4 className="post__text"><strong>{title}</strong> - {date}</h4>
            </div>
            <p className="post__description">{description}</p>
        </div>

    </div>
  )
}

export default Post
