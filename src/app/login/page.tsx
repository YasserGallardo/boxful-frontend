"use client";
import { useState } from "react";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, Flex, Input, Button, Typography, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const sanitizedCredentials = {
            username: DOMPurify.sanitize(credentials.username, { ALLOWED_ATTR: [], ALLOWED_TAGS: [] }),
            password: DOMPurify.sanitize(credentials.password, { ALLOWED_ATTR: [], ALLOWED_TAGS: [] }),
        };

        const result = await signIn("credentials", {
            redirect: false,
            username: sanitizedCredentials.username,
            password: sanitizedCredentials.password,
        });

        if (result?.error) {
            message.error("Usuario o contraseña incorrectos");
            setLoading(false);
        } else {
            message.success("Inicio de sesión exitoso");
            router.push("/envios");
        }
    };

    return (
        <Flex style={{ height: "100vh" }} align="center" justify="center">
            <Card style={{ width: 350, textAlign: "center", padding: "20px", background: "#FFFFFF" }}>
                <Image src="/boxful.gif" alt="Login" width={100} height={100} />
                <Typography.Title level={3}>Bienvenido</Typography.Title>
                <Typography.Text type="secondary">
                    Ingresa tus credenciales para continuar
                </Typography.Text>

                <Space direction="vertical" style={{ width: "100%", marginTop: "20px" }}>
                    <Input
                        size="large"
                        placeholder="Email"
                        prefix={<UserOutlined />}
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <Input.Password
                        size="large"
                        placeholder="Contraseña"
                        prefix={<LockOutlined />}
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="primary"
                        block
                        loading={loading}
                        onClick={handleSubmit}
                        style={{ backgroundColor: "#FF4300", borderColor: "#FF4300" }}
                    >
                        Iniciar sesión
                    </Button>
                </Space>
                <Typography.Text style={{ marginTop: 10, display: "block" }}>
                    ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                </Typography.Text>
            </Card>
        </Flex>
    );
}
