import React from 'react';
import './rank.styles.css';

const Rank = ({ name, entries }) => (
    <div className="rank">
        <div className="title">Hi {name}, your current entry count is...</div>
        <div className="entries">#{entries}</div>
    </div>
);

export default Rank;
