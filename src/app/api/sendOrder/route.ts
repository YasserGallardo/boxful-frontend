import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendOrder } from "@/app/envios/api/apiService";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.backendTokens?.accessToken) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await req.json();
    try {
        const result = await sendOrder(data, session.backendTokens.accessToken);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Error al procesar" }, { status: 500 });
    }
}
