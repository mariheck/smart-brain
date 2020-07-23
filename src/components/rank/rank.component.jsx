import React from 'react';
import './rank.styles.css';

const Rank = ({ name, entries, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <div className="rank">
                <div className="intro">
                    Hi {name}, your current entry count is...
                </div>
                <div className="title">#{entries}</div>
            </div>
        );
    } else {
        return (
            <div className="rank">
                <div className="title">Hi stranger !</div>
            </div>
        );
    }
};

export default Rank;
