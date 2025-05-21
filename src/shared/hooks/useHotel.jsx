import { useState, useEffect } from 'react';
import {
    getHoteles as getHotelesRequest,
    addHotel as addHotelRequest,
    deleteHotel as deleteHotelRequest,
    updateHotel as updateHotelRequest,
    getHotelById as getHotelByIdRequest,
} from '../../services';
import toast from 'react-hot-toast';

export const useHotel = () => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHotels = async () => {
        setIsLoading(true);
        try {
            const response = await getHotelesRequest();
            if (response.error) {
                toast.error("Error al cargar hoteles");
                setHotels([]);
            } else {
                setHotels(response.data?.hotels || response.hotels || []);
            }
        } catch (err) {
            toast.error("Error al cargar hoteles " + err.message);
            setHotels([]);
        }
        setIsLoading(false);
    }

    const addHotel = async (hotelData) => {
        setIsLoading(true);
        const response = await addHotelRequest(hotelData);
        setIsLoading(false);

        if (response.error) {
            toast.error("Error al agregar hotel");
            return;
        }

        toast.success("Hotel agregado correctamente");
        await fetchHotels();
        return true;
    }

    const deleteHotel = async (hid) => {
        try {
            await deleteHotelRequest(hid);
            toast.success("Hotel eliminado correctamente");
            await fetchHotels();
            return true;
        } catch (err) {
            toast.error("Error al eliminar hotel " + err.message);
            return;
        }
    }

    const updateHotel = async (hid, data) => {
        try {
            await updateHotelRequest(hid, data);
            toast.success("Hotel actualizado correctamente");
            await fetchHotels();
            return true;
        } catch (err) {
            toast.error("Error al actualizar hotel " + err.message);
            return;
        }
    }

    const getHotelById = async (hid) => {
        setIsLoading(true);
        try {
            const response = await getHotelByIdRequest(hid);
            setIsLoading(false);
            if (response.error) {
                toast.error("Error al obtener hotel");
                return null;
            }
            return response.data || response;
        } catch (err) {
            setIsLoading(false);
            toast.error("Error al obtener hotel " + err.message);
            return null;
        }
    }

    useEffect(() => {
        fetchHotels();
    }, []);

    return {
        hotels,
        isLoading,
        addHotel,
        deleteHotel,
        updateHotel,
        getHotelById,
        fetchHotels,
    };
};