import React from "react";
import { EditButton } from "../EditButton";
import { DeleteButton } from "../DeleteButton";

const HotelTable = ({ hotels, onEdit, onDelete }) => (
    <table className="hotels-table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Servicios</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {hotels.map((hotel) => (
                <tr key={hotel.hid || hotel._id}>
                    <td>{hotel.name}</td>
                    <td>{hotel.description}</td>
                    <td>{hotel.address}</td>
                    <td>{hotel.telephone}</td>
                    <td>
                        <ul>
                            {hotel.services && hotel.services.map((service, hotelId) => (
                                <li key={hotelId}>
                                    {service.type} - ${service.price}
                                </li>
                            ))}
                        </ul>
                    </td>
                    <td>{hotel.status ? "Activo" : "Inactivo"}</td>
                    <td>
                        <div className="action-buttons">
                            <EditButton onClick={() => onEdit(hotel)} />
                            <DeleteButton onClick={() => onDelete(hotel.hid || hotel._id)} />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default HotelTable;