import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './logo.styles.css';

const Logo = () => (
    <div className="logo">
        <Tilt
            className="tilt"
            options={{ max: 55 }}
            style={{ height: 150, width: 150 }}
        >
            <img src={brain} alt="logo" />
        </Tilt>
    </div>
);

export default Logo;
