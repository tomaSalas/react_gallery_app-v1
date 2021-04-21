import React from "react";

//import component
import Photo from "./Photo";

const PhotoContainer = (props) => {
    const photoData = props.photos;
    let photosToRender = photoData.map(photo => {
        <Photo 
          key={photo.id}
          url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}  />
    });
    return (
        <div className="photo-container">
        <h2>Results</h2>
        <ul>
        {photosToRender}
        </ul>
      </div>

    );
}

export default PhotoContainer;