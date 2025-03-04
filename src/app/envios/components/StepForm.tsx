"use client";

import { useState } from "react";
import { Steps, Button, Form, message, Row, Col } from "antd";
import GeneralInformation from "./forms/GeneralInformation";
import PackagesList from "./forms/PackagesList";
import { sendOrder } from "../api/apiService";
import { CheckOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const steps = [
    { component: <GeneralInformation /> },
    { component: <PackagesList /> },
];

export default function StepForm() {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});

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
            const finalData = { ...formData, ...values };

            console.log("Datos enviados:", finalData);
            await sendOrder(finalData);

            message.success("¡Orden creada con éxito!");
        } catch (error) {
            console.error("Error al enviar la orden:", error);
            message.error("Hubo un problema al crear la orden");
        }
    };

    return (
        <>
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
                            <Button type="primary" onClick={next} icon={<RightOutlined />} iconPosition="end">
                                Siguiente
                            </Button>
                        ) : (
                            <Button type="primary" onClick={handleFinish} icon={<CheckOutlined />} iconPosition="end">
                                Crear orden
                            </Button>
                        )}
                    </Col>
                </Row>
            </Form>
        </>
    );
}
