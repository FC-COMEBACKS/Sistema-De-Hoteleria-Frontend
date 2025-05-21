/*import React, { useState } from 'react';
import HabitacionesTable from './HabitacionesTable.jsx';
import HabitacionesToolbar from './HabitacionesToolbar.jsx';
import HabitacionesForm from './HabitacionesForm.jsx';


const HabitacionesList = () => {
    const [rooms, addRooms, deleteRooms, updateRooms] = useHabitaciones();
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    const handleSaveRoom = async (formData) => {
        let success = false;

        if (editingRoom) {
            success = await updateRooms(editingRoom.id, formData);
        } else {
            success = await addRooms(formData);
        }

        if (success) {
            setShowForm(false);
            setEditingRoom(null);
            window.location.reload();
        }
    };

    const handleEditRoom = (roomToEdit) => {
        setEditingRoom(roomToEdit);
        setShowForm(true);
    }; 

    const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='habitaciones-container'>
            <h2 className='habitaciones-title'>Lista de Habitaciones</h2>
            <HabitacionesToolbar search={search} setSearch={setSearch} />
            <div className='habitaciones-content'>
                <div className='table-section'>
                    <HabitacionesTable
                        rooms={filteredRooms}
                        onEdit={handleEditRoom}
                        onDelete={deleteRooms}
                    />
                </div>
                {showForm && (
                    <div className='form-section'>
                        <HabitacionesForm
                            onSubmit={handleSaveRoom}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingRoom(null);
                            }}
                            initialData={editingRoom}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HabitacionesList;
*/