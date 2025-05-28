import React, { useState, useEffect } from "react";

const initialForm = {
    name: "",
    email: "",
    password: "",
    role: "",
    events: "",
    status: true
};

const roleOptions = [
    { value: "ADMIN_ROLE", label: "Administrador" },
    { value: "CLIENT_ROLE", label: "Cliente" },
    { value: "HOST_ROLE", label: "Anfitrión" }
];

const eventOptions = [
    { value: "FIFTEEN_YEARS", label: "XV Años" },
    { value: "WEDDINGS", label: "Bodas" },
    { value: "BIRTHDAYS", label: "Cumpleaños" },
    { value: "MEETINGS", label: "Reuniones" },
    { value: "BACHELOR_PARTIES", label: "Despedidas de soltero" }
];

const UserForm = ({ onSubmit, onCancel, initialData = null, isEdit = false }) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                password: "" 
            });
        } else {
            setForm(initialForm);
        }
    }, [initialData]);    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let formToSend = { ...form };
        
        // Remove empty fields
        if (isEdit && !formToSend.password) {
            delete formToSend.password;
        }
        
        // Make role and events optional (send only if they have values)
        if (formToSend.role === "") {
            delete formToSend.role;
        }
        if (formToSend.events === "") {
            delete formToSend.events;
        }
        
        // Convert 'name' field to match backend expectation
        // The backend auth/register endpoint expects 'name', not 'username'
        
        // Ensure status is properly set
        if (formToSend.status === undefined) {
            formToSend.status = true;
        }
        
        console.log("Sending form data:", formToSend);
        onSubmit(formToSend);
        if (!initialData) setForm(initialForm);
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h3>{initialData ? "Editar usuario" : "Agregar usuario"}</h3>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
            />
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
            />
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required={!isEdit}
            />
            {isEdit && (
                <small>Deja este campo vacío si no deseas cambiar la contraseña.</small>
            )}            <select
                name="role"
                value={form.role}
                onChange={handleChange}
            >
                <option value="">Selecciona un rol (opcional)</option>
                {roleOptions.map((role) => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                ))}
            </select>
            <select
                name="events"
                value={form.events}
                onChange={handleChange}
            >
                <option value="">Selecciona un evento (opcional)</option>
                {eventOptions.map((event) => (
                    <option key={event.value} value={event.value}>{event.label}</option>
                ))}
            </select>
            <label>
                <input
                    type="checkbox"
                    name="status"
                    checked={form.status}
                    onChange={handleChange}
                />
                Activo
            </label>
            <div className="form-buttons">
                <button type="submit" className="add-button">
                    {initialData ? "Actualizar" : "Guardar"}
                </button>
                <button type="button" className="cancel-button" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default UserForm;