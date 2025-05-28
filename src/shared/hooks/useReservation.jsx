import { useState, useEffect } from "react";
import {
    getReservations as getReservationsRequest,
    addReservation as addReservationRequest,
    deleteReservation as deleteReservationRequest,
    updateReservation as updateReservationRequest,
    getReservationById as getReservationByIdRequest,
} from "../../services";
import toast from "react-hot-toast";

export const useReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReservations = async () => {
        setIsLoading(true);
        try {
            const response = await getReservationsRequest();
            if (response.error) {
                toast.error("Error al cargar reservaciones");
                setReservations([]);
            } else {
                setReservations(response.data?.reservations || []);
            }
        } catch (error) {
            toast.error("Error al cargar reservaciones: " + error.message);
            setReservations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const addReservation = async (reservationData) => {
        setIsLoading(true);
        try {
            const response = await addReservationRequest(reservationData);
            if (response.error) {
                toast.error("Error al agregar reservación");
                return false;
            }
            toast.success("Reservación agregada correctamente");
            await fetchReservations();
            return true;
        } catch (error) {
            toast.error("Error al agregar reservación: " + error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteReservation = async (id) => {
        try {
            await deleteReservationRequest(id);
            toast.success("Reservación eliminada correctamente");
            await fetchReservations();
            return true;
        } catch (error) {
            toast.error("Error al eliminar reservación: " + error.message);
            return false;
        }
    };

    const updateReservation = async (id, data) => {
        try {
            await updateReservationRequest(id, data);
            toast.success("Reservación actualizada correctamente");
            await fetchReservations();
            return true;
        } catch (error) {
            toast.error("Error al actualizar reservación: " + error.message);
            return false;
        }
    };

    const getReservationById = async (id) => {
        setIsLoading(true);
        try {
            const response = await getReservationByIdRequest(id);
            if (response.error) {
                toast.error("Error al obtener la reservación");
                return null;
            }
            return response.data || null;
        } catch (error) {
            toast.error("Error al obtener la reservación: " + error.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return {
        reservations,
        isLoading,
        fetchReservations,
        addReservation,
        deleteReservation,
        updateReservation,
        getReservationById,
    };
};