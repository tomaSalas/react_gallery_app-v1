import React from "react";

//import component
import Photo from "./Photo";
import NoPhoto from "./NoPhoto";

const PhotoContainer = (props) => {
    const photoData = props.photos;
    let photosToRender;
    if (photoData.length > 0) {
      photosToRender = photoData.map(photo => {
        return (
          <Photo 
            key={photo.id}
            url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}  />
        );
      });
    } else {
      photosToRender = <NoPhoto  />
    }
    
    
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