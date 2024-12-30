import React from 'react';

const BarList = ({ bars, onBarClick }) => {
    return (
        <div>
            <h2>Lista de Bares</h2>
            <ul>
                {bars.map((bar) => (
                    <li key={bar.id} onClick={() => onBarClick(bar)}>
                        {bar.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BarList;