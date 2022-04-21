import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import LinkIcon from '@mui/icons-material/Link';
import './Post.css'

function Post({imageUrl, title, date, description, rawDate}) {
  return (
    <div className="post">
        <div className="post__header_lead">
            <h2 className="post__title">{title}</h2>
            <h4 className="post__date">{date}</h4>
        </div>

        <img className="post__image" src={imageUrl} alt=""/>
        
        <div className="post__footer">
            <div className="post__footer_actions">
                <FormControlLabel
                title="like image by pressing" alt="like image by pressing"
                    control={<Checkbox icon={<FavoriteBorder />} 
                            checkedIcon={<Favorite />}
                    name="checkedH" />}
                />
                <div title="get link by pressing" alt="get link by pressing">
                    <LinkIcon className="post__link" onClick={() => {navigator.clipboard.writeText("http://localhost:3000/"+rawDate)}}/>
                </div>
            </div>
            <p className="post__description">{description}</p>
        </div>

    </div>
  )
}

export default Post
