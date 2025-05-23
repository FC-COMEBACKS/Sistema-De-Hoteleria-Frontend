import { useState, useEffect } from 'react';
import {
    getRooms as getRoomsRequest,
    getRoomById as getRoomByIdRequest,
    createRooms as createRoomsRequest,
    updateRoom as updateRoomRequest,
} from '../../services'; 
import toast from 'react-hot-toast';

export const useRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const response = await getRoomsRequest();
            if (response.error) {
                toast.error("Error al cargar habitaciones");
                setRooms([]);
            } else {
                setRooms(response.data?.rooms || response.rooms || []);
            }
        } catch (err) {
            toast.error("Error al cargar habitaciones " + err.message);
            setRooms([]);
        }
        setIsLoading(false);
    };

    const fetchRoomById = async (id) => {
        setIsLoading(true);
        try {
            const response = await getRoomByIdRequest(id);
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al obtener habitación");
                return null;
            }
            return response.data || response.room || null;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al obtener habitación " + err.message);
            return null;
        }
    };

    const addRoom = async (roomData) => {
        setIsLoading(true);
        const response = await createRoomsRequest(roomData);
        setIsLoading(false);

        if (response.error) {
            toast.error("Error al agregar habitación");
            return;
        }

        toast.success("Habitación agregada correctamente");
        await fetchRooms();
        return true;
    };

    const updateRoom = async (id, data) => {
        setIsLoading(true);
        try {
            await updateRoomRequest(id, data);
            toast.success("Habitación actualizada correctamente");
            await fetchRooms();
            setIsLoading(false);
            return true;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al actualizar habitación " + err.message);
            return;
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return {
        rooms,
        isLoading,
        fetchRooms,
        fetchRoomById,
        addRoom,
        updateRoom,
    };
};