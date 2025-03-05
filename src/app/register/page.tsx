"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, Flex, Input, Button, Typography, Space, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import DOMPurify from "dompurify";
import { config } from "../../../config";

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            const sanitizedUserData = Object.fromEntries(
                Object.entries(userData).map(([key, value]) => [
                    key,
                    DOMPurify.sanitize(value, { ALLOWED_ATTR: [], ALLOWED_TAGS: [] }),
                ])
            );
            const response = await fetch(`${config.API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sanitizedUserData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Error al registrarse");

            message.success("Registro exitoso, iniciando sesión...");

            // Iniciar sesión automáticamente
            const result = await signIn("credentials", {
                redirect: false,
                username: userData.email,
                password: userData.password,
            });

            if (result?.error) {
                message.error("Registro exitoso, pero error al iniciar sesión.");
                router.push("/login");
            } else {
                router.push("/envios");
            }
        } catch (error: any) {
            message.error(error.message || "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex style={{ height: "100vh" }} align="center" justify="center">
            <Card style={{ width: 350, textAlign: "center", padding: "20px", background: "#FFFFFF" }}>
                <Image src="/boxful.gif" alt="Register" width={100} height={100} />
                <Typography.Title level={3}>Crea una cuenta</Typography.Title>
                <Typography.Text type="secondary">
                    Ingresa tus datos para registrarte
                </Typography.Text>

                <Space direction="vertical" style={{ width: "100%", marginTop: "20px" }}>
                    <Input
                        size="large"
                        placeholder="Nombre"
                        prefix={<UserOutlined />}
                        name="name"
                        value={userData.username}
                        onChange={handleChange}
                    />
                    <Input
                        size="large"
                        placeholder="Correo electrónico"
                        prefix={<MailOutlined />}
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <Input.Password
                        size="large"
                        placeholder="Contraseña"
                        prefix={<LockOutlined />}
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="primary"
                        block
                        loading={loading}
                        onClick={handleRegister}
                        style={{ backgroundColor: "#FF4300", borderColor: "#FF4300" }}
                    >
                        Registrarse
                    </Button>
                </Space>

                <Typography.Text style={{ marginTop: 10, display: "block" }}>
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                </Typography.Text>
            </Card>
        </Flex>
    );
}
