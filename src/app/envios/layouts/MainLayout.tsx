"use client";

import { Layout, Button } from "antd";
import Image from "next/image";
import { signOut } from "next-auth/react";

const { Header, Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            <Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#FFFFFF",
                    padding: "0 20px",
                }}
            >
                {/* Logo */}
                <Image src="/boxful.gif" alt="Login" width={50} height={50} />

                {/* Botón de Cerrar Sesión */}
                <Button type="primary" danger onClick={() => signOut({ callbackUrl: "/login" })}>
                    Cerrar Sesión
                </Button>
            </Header>

            <Content style={{ padding: "0 48px" }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        borderRadius: 8,
                    }}
                >
                    {children}
                </div>
            </Content>
        </Layout>
    );
}
