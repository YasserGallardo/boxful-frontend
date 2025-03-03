"use client";

import { Form, Input, DatePicker, Row, Col, Select } from "antd";

const { Option } = Select;

export default function GeneralInformation() {
    return (
        <>

            <Row gutter={16}>
                <Col span={18}>
                    <Form.Item
                        label="📍Dirección de recolección"
                        name="direccionEnvio"
                        rules={[{ required: true, message: "Ingrese la dirección de recolección" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="📆 Fecha programada"
                        name="fechaProgramada"
                        rules={[{ required: true, message: "Seleccione la fecha programada" }]}
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                            style={{ width: "100%" }}
                            placeholder=""
                        />
                    </Form.Item>
                </Col>

            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[{ required: true, message: "Ingrese su nombre" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Apellidos"
                        name="apellido"
                        rules={[{ required: true, message: "Ingrese sus apellidos" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Correo Electrónico"
                        name="email"
                        rules={[
                            { required: true, message: "Ingrese su correo" },
                            { type: "email", message: "Ingrese un correo válido" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>


            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item
                        label="Teléfono"
                        name="telefono"
                        rules={[{ required: true, message: "Ingrese su teléfono" }]}
                    >
                        <Input addonBefore={<Select defaultValue="+503" options={[{ value: "+503", label: "+503" }]} />} />

                    </Form.Item>
                </Col>
                <Col span={18}>
                    <Form.Item
                        label="📮Dirección de destinatario"
                        name="direccion"
                        rules={[{ required: true, message: "Ingrese la dirección del destinatario" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>


            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        label="Departamento"
                        name="departamento"
                        rules={[{ required: true, message: "Seleccione el departamento" }]}
                    >
                        <Select placeholder="">
                            <Option value="san_salvador">San Salvador</Option>
                            <Option value="la_libertad">La Libertad</Option>
                            <Option value="santa_ana">Santa Ana</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Municipio"
                        name="municipio"
                        rules={[{ required: true, message: "Seleccione el municipio" }]}
                    >
                        <Select placeholder="">
                            <Option value="antiguo_cuscatlan">Antiguo Cuscatlán</Option>
                            <Option value="santa_tecla">Santa Tecla</Option>
                            <Option value="soyapango">Soyapango</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Punto de referencia"
                        name="puntoReferencia"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>


            <Row>
                <Col span={24}>
                    <Form.Item label="Indicaciones" name="indicaciones">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}
