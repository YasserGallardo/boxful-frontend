"use client";

import { Form, Input } from "antd";

export default function PackagesList() {
    return (
        <>
            <Form.Item
                label="Dirección"
                name="direccion"
                rules={[{ required: true, message: "Por favor ingrese su dirección" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Ciudad"
                name="ciudad"
                rules={[{ required: true, message: "Por favor ingrese su ciudad" }]}
            >
                <Input />
            </Form.Item>
        </>
    );
}
