import React, { useEffect, useState } from "react";

const initialForm = {
    hotel: "",
    room: "",
    startDate: "",
    exitDate: "",
};

const ReservationForm = ({
    onSubmit,
    onCancel,
    initialData = null,
    hotels = [],
    rooms = [],
}) => {
    const [form, setForm] = useState(initialForm);
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        if (initialData) {
            setForm({
                hotel: initialData.hotel?._id || initialData.hotel || "",
                room: initialData.room?._id || initialData.room || "",
                startDate: initialData.startDate?.slice(0, 10) || "",
                exitDate: initialData.exitDate?.slice(0, 10) || "",
            });
        } else {
            setForm(initialForm);
        }
    }, [initialData]);

    useEffect(() => {
        setFilteredRooms(rooms);
    }, [rooms]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.hotel || !form.room || !form.startDate || !form.exitDate) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }
        onSubmit(form);
        if (!initialData) setForm(initialForm);
    };

    return (
        <form onSubmit={handleSubmit} className="reservation-form">
            <h3>{initialData ? "Editar reservación" : "Agregar reservación"}</h3>

            <label>Hotel:</label>
            <select
                name="hotel"
                value={form.hotel}
                onChange={handleChange}
                required
            >
                <option value="">Selecciona un hotel</option>
                {hotels.map((hotel) => (
                    <option key={hotel._id || hotel.hid} value={hotel._id || hotel.hid}>
                        {hotel.name}
                    </option>
                ))}
            </select>

            <label>Habitación:</label>
            <select
                name="room"
                value={form.room}
                onChange={handleChange}

            >
                <option value="">Selecciona una habitación</option>
                {filteredRooms.map((room) => (
                    <option key={room._id || room.rid} value={room._id || room.rid}>
                        {room.name}
                    </option>
                ))}
            </select>

            <label>Fecha de inicio:</label>
            <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
            />

            <label>Fecha de salida:</label>
            <input
                type="date"
                name="exitDate"
                value={form.exitDate}
                onChange={handleChange}
                required
            />

            <div className="form-buttons">
                <button type="submit" className="add-button">
                    {initialData ? "Actualizar" : "Guardar"}
                </button>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default ReservationForm;
