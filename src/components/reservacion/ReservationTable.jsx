import React from "react";
import { EditButton } from "../EditButton";
import { DeleteButton } from "../DeleteButton";

const ReservationTable = ({ reservations, onEdit, onDelete }) => (
    <table className="rooms-table reservations-table">
        <thead>
            <tr>
                <th>Hotel</th>
                <th>Habitación</th>
                <th>Fecha Inicio</th>
                <th>Fecha Final</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {reservations.map((reservation) => (
                <tr key={reservation.id || reservation._id}>
                    <td>
                        {reservation.hotel?.name || reservation.hotelName || "N/A"}
                    </td>
                    <td>
                        {reservation.room?.name || reservation.roomName || "N/A"}
                    </td>
                    <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                    <td>{new Date(reservation.exitDate).toLocaleDateString()}</td>
                    <td>
                        <div className="action-buttons">
                            <EditButton onClick={() => onEdit(reservation)} />
                            <DeleteButton onClick={() => onDelete(reservation.id || reservation._id)} />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ReservationTable;