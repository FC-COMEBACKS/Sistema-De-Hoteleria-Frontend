import React, { useState, useEffect } from 'react';

const initialForm = {
    name: '',
    description: '',
    capacity: '',
    pricePerDay: ''
};

export const HabitacionesForm = ({ onSubmit, onCancel, initialData = null }) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        } else {
            setForm(initialForm);
        }
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.name || !form.description || !form.capacity || !form.pricePerDay) {
            alert('Por favor completa todos los campos');
            return;
        }
        onSubmit(form);

        if (!initialData) {
            setForm(initialForm);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='habitacion-form'>
            <h3>{initialData ? 'Editar habitación' : 'Agregar habitación'}</h3>

            <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Nombre'
            />
            <input
                type='text'
                name='description'
                value={form.description}
                onChange={handleChange}
                placeholder='Descripción'
            />
            <input
                type='number'
                name='capacity'
                value={form.capacity}
                onChange={handleChange}
                placeholder='Capacidad'
                min='1'
            />
            <input
                type='number'
                name='pricePerDay'
                value={form.pricePerDay}
                onChange={handleChange}
                placeholder='Precio por día'
                min='0'
            />

            <div className='form-buttons'>
                <button type='submit' className='add-button'>
                    {initialData ? 'Actualizar' : 'Guardar'}
                </button>
                <button type='button' className='cancel-button' onClick={onCancel}>
                    cancelar
                </button>
                </div>
        </form>
    )
}