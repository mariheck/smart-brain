import React from 'react';
import './image-link-form.styles.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => (
    <div className="image-link-form">
        <p>
            This magic brain will detect faces in your pictures. Give it a try!
        </p>
        <div className="image-link-form-box">
            <div className="form">
                <input
                    type="text"
                    className="form-input"
                    placeholder="Image URL"
                    onChange={onInputChange}
                    onKeyDown={event => {
                        if (event.keyCode === 13) onPictureSubmit();
                    }}
                />
                <button className="form-button" onClick={onPictureSubmit}>
                    Detect
                </button>
            </div>
        </div>
    </div>
);

export default ImageLinkForm;
