import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './logo.styles.css';

const Logo = ({ onRouteChange }) => (
    <div className="logo" onClick={() => onRouteChange('home')}>
        <Tilt className="tilt" options={{ max: 55 }}>
            <img src={brain} alt="logo" />
        </Tilt>
    </div>
);

export default Logo;
