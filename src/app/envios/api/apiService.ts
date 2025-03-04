import { config } from "../../../../config";
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function sendOrder(data: unknown) {
    try {
        const response = await axios.post(`${config.API_URL}/envios`, data);

        if (!response.data) throw new Error("Error en la solicitud");

        return response.data;
    } catch (error) {
        console.error("Error en el envío de datos:", error);
        throw error;
    }
}

