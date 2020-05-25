import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt
                className="Tilt br2 shadow-2 pa3"
                options={{ max: 55 }}
                style={{ height: 150, width: 150 }}
            >
                <img
                    src={brain}
                    alt="logo"
                    style={{ padding: '10px', height: '75%' }}
                />
            </Tilt>
        </div>
    );
};

export default Logo;