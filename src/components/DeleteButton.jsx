import React from "react";

export const DeleteButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="btn btn-danger">
            Eliminar
        </button>
    );
};