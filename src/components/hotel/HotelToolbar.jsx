import React from "react";

const HotelToolbar = ({ search, setSearch, onAddClick }) => (
    <div className="toolbar">
        <input
            type="text"
            placeholder="Buscar hotel por nombre..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-button" onClick={onAddClick}>
            + Agregar Hotel
        </button>
    </div>
);

export default HotelToolbar;