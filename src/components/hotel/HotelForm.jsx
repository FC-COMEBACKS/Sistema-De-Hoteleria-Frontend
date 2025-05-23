import React, { useState, useEffect } from "react";

const initialForm = {
    name: "",
    description: "",
    address: "",
    telephone: "",
    services: [
        {
            type: "",
            price: ""
        }
    ]
}

const serviceTypes = [
    "Hotel",
    "Singleroom",
    "Doubleroom",
    "Suite",
    "Deluxeroom",
    "Event"
];

const HotelForm = ({ onSubmit, onCancel, initialData = null }) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                services: initialData.services && initialData.services.length > 0
                    ? initialData.services
                    : [{ type: "", price: 0 }]
            });
        } else {
            setForm(initialForm);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleServiceChange = (idHotel, e) => {
        const { name, value } = e.target;
        const updatedServices = form.services.map((service, i) =>
            i === idHotel ? { ...service, [name]: name === "price" ? Number(value) : value } : service
        );
        setForm((prev) => ({
            ...prev,
            services: updatedServices
        }));
    };

    const addService = () => {
        setForm((prev) => ({
            ...prev,
            services: [...prev.services, { type: "", price: 0 }]
        }));
    };

    const removeService = (idHotel) => {
        setForm((prev) => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== idHotel)
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.description || !form.address || !form.telephone || form.services.length === 0) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }
        if (form.services.some(s => !s.type || s.price === "" || isNaN(Number(s.price)))) {
            alert("Completa todos los servicios con precios válidos.");
            return;
        }

        const formToSend = {
            ...form,
            services: form.services.map(s => ({
                ...s,
                price: Number(s.price)
            }))
        };
        onSubmit(formToSend);
        if (!initialData) setForm(initialForm);
    }

    return (
        <form onSubmit={handleSubmit} className="hotel-form">
            <h3>{initialData ? "Editar hotel" : "Agregar hotel"}</h3>
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
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Dirección"
                required
            />
            <input
                type="text"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="Teléfono"
                maxLength={8}
                required
            />

            <div>
                <label>Servicios:</label>
                {form.services.map((service, idHotel) => (
                    <div key={idHotel} className="service-row">
                        <select
                            name="type"
                            value={service.type}
                            onChange={(e) => handleServiceChange(idHotel, e)}
                            required
                        >
                            <option value="">Tipo de servicio</option>
                            {serviceTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="price"
                            value={service.price}
                            onChange={(e) => handleServiceChange(idHotel, e)}
                            placeholder="Precio"
                            min={0}
                            step="0.01"
                            required
                        />
                        {form.services.length > 1 && (
                            <button type="button" onClick={() => removeService(idHotel)}>
                                Quitar
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addService}>
                    Agregar servicio
                </button>
            </div>

            <div className="form-buttons">
                <button type="submit" className="add-button">
                    {initialData ? "Actualizar" : "Guardar"}
                </button>
                <button type="button" className="cancel-button" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    )
}

export default HotelForm;