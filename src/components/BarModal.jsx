import React from 'react';

const BarModal = ({ bar, onClose }) => {
    if (!bar) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{bar.name}</h2>
                <p>{bar.description}</p>
            </div>
        </div>
    );
};

export default BarModal;