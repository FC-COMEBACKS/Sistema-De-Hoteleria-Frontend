import React, { useState } from "react";
import { useHotel } from "../../shared/hooks/useHotel";
import HotelToolbar from "./HotelToolbar";
import HotelTable from "./HotelTable";
import HotelForm from "./HotelForm";
import toast from "react-hot-toast";

const Notification = (message) => {
    toast.custom((t) => (
        <div className="hotel-toast">
            <span className="hotel-toast-message">{message}</span>
            <button
                className="hotel-toast-close"
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

const HotelList = () => {
    const { hotels, addHotel, deleteHotel, updateHotel, isLoading } = useHotel();
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);

    const handleSaveHotel = async (formData) => {
        let success = false;

        if (editingHotel) {
            success = await updateHotel(editingHotel.hid, formData);
        } else {
            success = await addHotel(formData);
        }

        if (success) {
            setShowForm(false);
            setEditingHotel(null);
            Notification("Hotel guardado correctamente");
        }
    };

    const handleEditClick = (hotelEdit) => {
        setEditingHotel(hotelEdit);
        setShowForm(true);
    };

    const handleDeleteHotel = async (hid) => {
        await deleteHotel(hid);
    };

    const filteredHotels = hotels.filter((hotel) =>
        `${hotel.name}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="hotels-container">
            <h2 className="hotels-title">Lista de Hoteles</h2>

            <HotelToolbar
                search={search}
                setSearch={setSearch}
                onAddClick={() => {
                    setShowForm(true);
                    setEditingHotel(null);
                }}
                onReport={() => Notification("Funcionalidad de reporte no implementada")}
            />

            <div className="hotel-content">
                {showForm && (
                    <div className="form-section">
                        <HotelForm
                            onSubmit={handleSaveHotel}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingHotel(null);
                            }}
                            initialData={editingHotel}
                        />
                    </div>
                )}
                <div className="table-section">
                    <HotelTable
                        hotels={filteredHotels}
                        onDelete={handleDeleteHotel}
                        onEdit={handleEditClick}
                    />
                </div>
            </div>
            {isLoading && <div>Cargando hoteles...</div>}
        </div>
    );
};

export default HotelList;