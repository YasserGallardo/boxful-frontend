"use client";

import { Card, Typography } from "antd";
import StepForm from "./components/StepForm";

export default function Envios() {
    return (
        <>
            <Typography.Title level={3}>Crea una orden</Typography.Title>
            <Typography.Text type="secondary">
                Dale una ventaja competitiva a tu negocio con entregas el mismo día  (Área Metropolitana) y el día siguiente a nivel nacional.
            </Typography.Text>
            <Card style={{ padding: "20px", background: "#FFFFF", marginTop: "20px" }}><StepForm />
            </Card>
        </>
    )
}