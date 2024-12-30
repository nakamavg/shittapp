import React, { useState } from 'react';
import styles from './SearchBar.module.css'; // Importa los estilos

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
        setQuery("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchBarForm}> {/* Aplica la clase del módulo */}
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar un lugar..."
                className={styles.searchInput}  
            />
            <button type="submit" className={styles.searchButton}>Buscar</button> {/* Aplica la clase del módulo */}
        </form>
    );
};

export default SearchBar;