import React from 'react';
import { EditButton } from '../EditButton';

export const HabitacionesTable = ({ rooms, onEdit }) => (
    <table className="rooms-table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Capacidad</th>
                <th>Precio por Día</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th>Hotel</th>
                <th>Reservaciones</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {rooms.map((room) => (
                <tr key={room.rid || room._id}>
                    <td>{room.name}</td>
                    <td>{room.description}</td>
                    <td>{room.capacity}</td>
                    <td>{room.pricePerDay}</td>
                    <td>{room.status ? 'Disponible' : 'Ocupada'}</td>
                    <td>{room.type}</td>
                    <td>{room.hotel?.name || room.hotel || 'Sin hotel'}</td>
                    <td>
                        {Array.isArray(room.reservations)
                            ? room.reservations.length
                            : 0}
                    </td>
                    <td>
                        <div className="action-buttons">
                            <EditButton onClick={() => onEdit(room)} />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);