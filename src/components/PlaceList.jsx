import React from 'react';
import styles from './PlaceList.module.css'; // Importa los estilos

const PlaceList = ({ places, onPlaceClick }) => {
    return (
        <div className={styles.placeListContainer}> {/* Aplica la clase del módulo */}
            <h2>Lugares Cercanos</h2>
            <ul>
                {places.length === 0 ? <p>No se encontraron lugares.</p> : places.map((place, index) => (
                    <li key={place.id || index} onClick={() => onPlaceClick(place)} className={styles.placeItem}> {/* Aplica la clase del módulo */}
                        <h3>{place.name}</h3>
                        <p>{place.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaceList;