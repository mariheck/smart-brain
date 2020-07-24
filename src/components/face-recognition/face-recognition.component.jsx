import React from 'react';
import './face-recognition.styles.css';

const FaceRecognition = ({ imageUrl, boxes }) => (
    <div className="face-recognition">
        <div className="image-container">
            <img id="inputImage" src={imageUrl} alt="" />
            {boxes.map((box, idx) => (
                <div
                    key={idx}
                    className="bounding-box"
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol
                    }}
                ></div>
            ))}
        </div>
    </div>
);

export default FaceRecognition;
