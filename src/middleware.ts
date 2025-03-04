import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req) {
    const { nextUrl } = req;
    const session = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token"); // Token en cookies

    const isAuthPage = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");

    // Si el usuario ya está autenticado, evitar que acceda a /login o /register y redirigir a /envios
    if (session && isAuthPage) {
        return NextResponse.redirect(new URL("/envios", req.url));
    }

    // Si no está autenticado y trata de acceder a /envios o rutas protegidas, redirigir a login
    if (!session && nextUrl.pathname.startsWith("/envios")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/envios/:path*"], // Protege estas rutas
};
