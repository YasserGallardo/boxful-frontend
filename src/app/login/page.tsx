"use client";
import { Card, Flex, Input, Button, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Login() {
    return (
        <Flex
            style={{ height: "100vh" }}
            align="center"
            justify="center"
        >
            <Card style={{ width: 350, textAlign: "center", padding: "20px", background: "#FFFFF" }}>

                <Image
                    src="/boxful.gif"
                    alt="Login"
                    width={100}
                    height={100}
                />
                <Typography.Title level={3}>Bienvenido</Typography.Title>
                <Typography.Text type="secondary">
                    Ingresa tus credenciales para continuar
                </Typography.Text>


                <Space direction="vertical" style={{ width: "100%", marginTop: "20px" }}>
                    <Input
                        size="large"
                        placeholder="Usuario"
                        prefix={<UserOutlined />}
                    />
                    <Input.Password
                        size="large"
                        placeholder="Contraseña"
                        prefix={<LockOutlined />}
                    />
                    <Button type="primary" block style={{ backgroundColor: "#FF4300", borderColor: "#FF4300" }}>
                        Iniciar sesión
                    </Button>
                </Space>
            </Card>
        </Flex>
    );
}
