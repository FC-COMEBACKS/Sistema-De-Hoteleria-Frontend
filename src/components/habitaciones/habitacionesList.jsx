import React, { useState, useEffect } from 'react';
import { useRoom } from '../../shared/hooks/useRoom';
import { useHotel } from '../../shared/hooks/useHotel';
import { HabitacionesToolbar } from './habitacionesToolbar';
import { HabitacionesTable } from './habitacionesTable';
import { HabitacionesForm } from './habitacionesForm';
import toast from 'react-hot-toast';

const Notification = (message) => {
    toast.custom((t) => (
        <div className="habitacion-toast">
            <span>{message}</span>
            <button
                className="habitacion-toast-close"
                onClick={() => toast.dismiss(t.id)}
            >
                Cerrar
            </button>
        </div>
    ), {
        position: 'top-right',
        duration: 5000,
    });
};

export const HabitacionesList = () => {
    const { rooms, addRoom, updateRoom, fetchRooms, isLoading } = useRoom();
    const { hotels } = useHotel();
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);


    const handleSaveRoom = async (formData) => {
        let success = false;

        if (editingRoom) {
            success = await updateRoom(editingRoom.rid || editingRoom._id, formData);
        } else {
            success = await addRoom(formData);
        }

        if (success) {
            setShowForm(false);
            setEditingRoom(null);
            Notification("Habitación guardada correctamente");
        }
    };

    const handleEditClick = (roomEdit) => {
        setEditingRoom(roomEdit);
        setShowForm(true);
    };

    const filteredRooms = rooms.filter((room) =>
        `${room.name}`.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="hotels-container">
            <h2 className="hotels-title">Lista de Habitaciones</h2>

            <HabitacionesToolbar
                search={search}
                setSearch={setSearch}
                onAddClick={() => {
                    setShowForm(true);
                    setEditingRoom(null);
                }}
            />

            <div className="hotel-content">
                <div className="table-section">
                    <HabitacionesTable
                        rooms={filteredRooms}
                        onEdit={handleEditClick}
                        hotels={hotels} 
                    />
                </div>

                {showForm && (
                    <div className="form-section">
                        <HabitacionesForm
                            onSubmit={handleSaveRoom}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingRoom(null);
                            }}
                            initialData={editingRoom}
                            hotels={hotels}
                        />
                    </div>
                )}
            </div>
            {isLoading && <div>Cargando habitaciones...</div>}
        </div>
    );
};