import React from 'react';
import './footer.styles.css';

const Footer = ({ onRouteChange }) => (
    <footer>
        <p>
            {new Date().getFullYear()} © Marine Heckler |{' '}
            <span
                className="mentions"
                onClick={() => onRouteChange('mentions')}
            >
                Mentions
            </span>
        </p>
    </footer>
);

export default Footer;
