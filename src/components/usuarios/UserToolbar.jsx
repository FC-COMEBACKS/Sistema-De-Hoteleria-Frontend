import React from "react";

const UserToolbar = ({ search, setSearch, onAddClick }) => (
    <div className="toolbar">
        <input
            type="text"
            placeholder="Buscar usuario por nombre o correo..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-button" onClick={onAddClick}>
            + Agregar Usuario
        </button>
    </div>
);

export default UserToolbar;