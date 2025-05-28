import React, { useState } from "react";
import { useReservation } from "../../shared/hooks/useReservation";
import { useHotel } from "../../shared/hooks/useHotel";
import { useRoom } from "../../shared/hooks/useRoom";
import ReservationToolbar from "./ReservationToolbar";
import ReservationTable from "./ReservationTable";
import ReservationForm from "./ReservationForm";
import toast from "react-hot-toast";

const Notification = (message) => {
    toast.custom((t) => (
        <div
            style={{
                background: "#fff",
                fontSize: "16px",
                padding: "10px 20px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
            }}
        >
            <span style={{ color: "#000" }}>{message}</span>
            <button
                style={{
                    marginLeft: "auto",
                    background: "#ff5252",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    padding: "6px 12px",
                    cursor: "pointer",
                }}
                onClick={() => toast.dismiss(t.id)}
            >
                Cerrar
            </button>
        </div>
    ), {
        position: "top-right",
        duration: 5000,
    });
};

const ReservationList = () => {
    const { reservations, addReservation, deleteReservation, updateReservation, isLoading } = useReservation();
    const { hotels } = useHotel();
    const { rooms } = useRoom();
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingReservation, setEditingReservation] = useState(null);

    const handleSaveReservation = async (formData) => {
        let success = false;

        if (editingReservation) {
            success = await updateReservation(editingReservation.id || editingReservation._id, formData);
        } else {
            success = await addReservation(formData);
        }

        if (success) {
            setShowForm(false);
            setEditingReservation(null);
            Notification("Reservación guardada correctamente");
        }
    };

    const handleEditClick = (reservationEdit) => {
        setEditingReservation(reservationEdit);
        setShowForm(true);
    };

    const handleDeleteReservation = async (id) => {
        await deleteReservation(id);
    };

    const filteredReservations = reservations.filter((reservation) => {
        if (!search) return true;
        const start = new Date(reservation.startDate).toLocaleDateString();
        const end = new Date(reservation.exitDate).toLocaleDateString();
        return start.includes(search) || end.includes(search);
    });

    return (
        <div className="reservations-container">
            <h2 className="reservations-title">Lista de Reservaciones</h2>
            <ReservationToolbar
                search={search}
                setSearch={setSearch}
                onAddClick={() => {
                    setShowForm(true);
                    setEditingReservation(null);
                }}
            />

            <div className="reservation-content">
                <div className="table-section">
                    <ReservationTable
                        reservations={filteredReservations}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteReservation}
                    />
                </div>
                {showForm && (
                    <div className="form-section">
                        <ReservationForm
                            onSubmit={handleSaveReservation}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingReservation(null);
                            }}
                            initialData={editingReservation}
                            hotels={hotels}
                            rooms={rooms}
                        />
                    </div>
                )}
            </div>
            {isLoading && <div>Cargando reservaciones...</div>}
        </div>
    );
};

export default ReservationList;