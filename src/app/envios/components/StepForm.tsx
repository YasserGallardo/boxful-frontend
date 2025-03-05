"use client";
import DOMPurify from "dompurify";
import { useState } from "react";
import { Steps, Button, Form, message, Row, Col, Result } from "antd";
import GeneralInformation from "./forms/GeneralInformation";
import PackagesList from "./forms/PackagesList";
import { sendOrder } from "../api/apiService";
import { CheckOutlined, LeftOutlined, PlusCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";

export default function StepForm() {
    const { data: session } = useSession();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [departamentoSelected, setDepartamentoSelected] = useState(null);
    const [orderCreated, setOrderCreated] = useState(false);

    const steps = [
        { component: <GeneralInformation form={form} setNombreDepartamento={setDepartamentoSelected} /> },
        { component: <PackagesList /> },
    ];

    const next = async () => {
        try {
            const values = await form.validateFields();
            setFormData((prev) => ({ ...prev, ...values }));
            setCurrent(current + 1);
        } catch (error) {
            console.log("Error de validación:", error);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
        form.setFieldsValue(formData);
    };

    const handleFinish = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            values.departamento = departamentoSelected;
            const sanitizedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) =>
                    key !== "paquetes"
                        ? [key, DOMPurify.sanitize(value, { allowedAttributes: [], allowedTags: [] })]
                        : [key, value]
                )
            );
            const paquetes = sanitizedValues.paquetes.map((paquete) => ({
                ...Object.fromEntries(
                    Object.entries(paquete).map(([key, value]) => [
                        key,
                        key !== "contenido" && typeof value === "string" ? parseInt(value, 10) : value,
                    ])
                ),
            }));
            sanitizedValues.paquetes = paquetes;
            const finalData = { ...formData, ...sanitizedValues };

            await sendOrder(finalData, session?.backendTokens.accessToken);
            setLoading(false);
            setOrderCreated(true);

        } catch (error) {
            message.error("Hubo un problema al crear la orden");
            setLoading(false);
        }
    };

    const handleCreateNewOrder = () => {
        setOrderCreated(false);
        setFormData({});
        form.resetFields();
        setCurrent(0);
    };

    if (orderCreated) {
        return (
            <Result
                status="success"
                title="¡Orden creada exitosamente!"
                subTitle="Tu pedido ha sido creado correctamente."
                extra={[
                    <Button type="primary" onClick={handleCreateNewOrder} icon={<PlusCircleOutlined />} style={{ backgroundColor: "#FF4300", borderColor: "#FF4300" }}>
                        Crear nueva orden
                    </Button>,
                ]}
            />
        );
    }

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={formData}
            style={{ marginTop: 0 }}
        >
            {steps[current].component}

            <Row style={{ marginTop: 24 }} justify="space-between" align="middle">
                <Col flex="auto" style={{ textAlign: "center" }}>
                    <Steps size="small" current={current} responsive={false} />
                </Col>

                <Col>
                    {current > 0 && (
                        <Button style={{ marginRight: 8 }} onClick={prev} icon={<LeftOutlined />} iconPosition="start">
                            Anterior
                        </Button>
                    )}
                    {current < steps.length - 1 ? (
                        <Button type="primary" onClick={next} icon={<RightOutlined />} iconPosition="end" style={{ backgroundColor: "#FF4300", borderColor: "#FF4300" }}>
                            Siguiente
                        </Button>
                    ) : (
                        <Button type="primary" loading={loading} onClick={handleFinish} icon={<CheckOutlined />} iconPosition="end" style={{ backgroundColor: "#FF4300", borderColor: "#FF4300" }}>
                            Crear orden
                        </Button>
                    )}
                </Col>
            </Row>
        </Form>
    );
}
