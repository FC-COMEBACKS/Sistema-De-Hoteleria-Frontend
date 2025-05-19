import { EditButton } from "../EditButton";
import { DeleteButton } from "../DeleteButton";

export const habitacionesTable = ({ rooms, onEdit, onDelete }) => (
    <table className='habitaciones-table'>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Capacidad</th>
                <th>Precio por dia</th>
            </tr>
        </thead>
        <tbody>
            {rooms.map((room) => (
                <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.description}</td>
                    <td>{room.capacity}</td>
                    <td>{room.price}</td>
                    <td>
                        <EditButton onClick={() => onEdit(room.id)} />
                        <DeleteButton onClick={() => onDelete(room.id)} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)