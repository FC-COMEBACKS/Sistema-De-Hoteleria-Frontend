import React from 'react';

export const habitacionesToolbar = ({ search, setSearch }) => (
    <div className='toolbar'>
        <input
            type = 'text'
            placeholder = 'Buscar por nombre o descripción...'
            className = 'search-input'
            value = {search}
            onChange = {(e) => setSearch(e.target.value)}
        />    
        <button className='add-button'>
            Agregar Habitación
        </button>
    </div>
)