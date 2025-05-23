import React, { useState, useEffect } from 'react';

const initialForm = {
    name: '',
    description: '',
    capacity: '',
    pricePerDay: '',
    type: '',
    hotel: '',
}

const roomTypes = [
    { value: '', label: 'Selecciona un tipo' },
    { value: 'SINGLE', label: 'Sencilla' },
    { value: 'DOUBLE', label: 'Doble' },
    { value: 'SUITE', label: 'Suite' },
    { value: 'DELUXE', label: 'Deluxe' },
]

export const HabitacionesForm = ({
    onSubmit,
    onCancel,
    initialData = null,
    hotels = [],
}) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialForm,
                ...initialData,
                hotel: initialData.hotel?._id || initialData.hotel || '',
            });
        } else {
            setForm(initialForm);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !form.name || !form.description || !form.capacity || !form.pricePerDay || !form.type || !form.hotel 

        ) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        const formToSend = {
            ...form,
            pricePerDay: Number(form.pricePerDay),
        };
        onSubmit(formToSend);

        if (!initialData) setForm(initialForm);
    };

    return (
        <form onSubmit={handleSubmit} className="hotel-form">
            <h3>{initialData ? 'Editar habitación' : 'Agregar habitación'}</h3>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
            />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descripción"
                required
            />
            <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Capacidad"
                min={1}
                required
            />
            <input
                type="number"
                name="pricePerDay"
                value={form.pricePerDay}
                onChange={handleChange}
                placeholder="Precio por día"
                min={0}
                step="0.01"
                required
            />
            <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
            >
                {roomTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <select
                name="hotel"
                value={form.hotel}
                onChange={handleChange}
                required
            >
                <option value="">Selecciona un hotel</option>
                {hotels.map((h) => (
                    <option key={h.hid || h._id} value={h.hid || h._id}>
                        {h.name}
                    </option>
                ))}
            </select>
            <div className="form-buttons">
                <button type="submit" className="add-button">
                    {initialData ? 'Actualizar' : 'Guardar'}
                </button>
                <button type="button" className="cancel-button" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
};