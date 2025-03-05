"use client";
import { Card, Typography, Avatar, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function AboutMe() {
  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <Card style={{ maxWidth: 400, textAlign: "center", padding: 20 }}>
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src={"/foto-perfil.jpg"}
          style={{ cursor: "pointer" }}
        />

        <Typography.Title level={3} style={{ marginTop: 20 }}>
          ¡Hola! Soy Yasser, un desarrollador apasionado.
        </Typography.Title>
        <Typography.Text>
          Disfruto creando soluciones tecnológicas eficientes con <strong>React, Next.js, Flask y Django</strong>.
          También me especializo en el desarrollo de <strong>APIs escalables con NestJS</strong>, siempre enfocado en construir software robusto y de alto rendimiento.
        </Typography.Text>

        <Typography.Text strong style={{ display: "block", marginTop: 15 }}>
          ¡Me encantaría unirme al equipo de <strong>BoxFul</strong> y aportar mi experiencia para impulsar grandes proyectos! 🚀
        </Typography.Text>

        <Typography.Text style={{ marginTop: 10, display: "block" }}>
          Para comenzar con la prueba técnica, primero <a href="/login">inicia sesión</a> o <a href="/register">regístrate aquí</a>.
        </Typography.Text>

        <Typography.Text style={{ marginTop: 10, display: "block" }}>
          También puedes acceder al apartado de <a href="/envios">Crear órdenes</a> para explorar los menús protegidos y comprobar su funcionamiento.
        </Typography.Text>
      </Card>
    </Flex>
  );
}
