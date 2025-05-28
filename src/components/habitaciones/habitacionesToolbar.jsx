import React from 'react';

export const HabitacionesToolbar = ({ search, setSearch, onAddClick }) => (
    <div className="toolbar">
        <input
            type="text"
            placeholder="Buscar por nombre..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-button" onClick={onAddClick}>
            + Agregar Habitación
        </button>
    </div>
);