import React from "react"

const ReservationToolbar = ({search, setSearch, onAddClick}) => (
    <div className="toolbar">
        <input
            type="text"
            placeholder="Buscar reservación por fecha..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-button" onClick={onAddClick}>
            + Agrega Tu Reservacion
        </button>
    </div>
)

export default ReservationToolbar