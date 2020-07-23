import React from 'react';
import './face-recognition.styles.css';

const FaceRecognition = ({ imageUrl, box }) => (
    <div className="face-recognition">
        <img
            id="inputImage"
            src={imageUrl}
            alt=""
            width="500px"
            height="auto"
        />
        <div
            className="bounding-box"
            style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
            }}
        ></div>
    </div>
);

export default FaceRecognition;
