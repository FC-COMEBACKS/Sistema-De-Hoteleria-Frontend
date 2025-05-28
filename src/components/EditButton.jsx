import React from "react";

export const EditButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="btn btn-warning">
            Editar
        </button>
    );
};