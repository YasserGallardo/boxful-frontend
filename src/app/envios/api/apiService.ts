import axios from "axios";
import { config } from "../../../../config";
import { notification } from "antd";

export async function sendOrder(data: unknown, token: string) {
    try {

        const response = await axios.post(`${config.API_URL}/envios`, data, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        notification.success({
            message: "Enviado",
            description: "El pedido se ha enviado con exito",
        })
        if (!response.data) throw new Error("Error en la solicitud");

        return response.data;
    } catch (error) {
        console.error("Error en el envío de datos:", error);
        throw error;
    }
}
