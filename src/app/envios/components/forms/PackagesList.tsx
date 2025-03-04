"use client";

import { Form, Input, Button, Card, Space, Row, Flex, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function PackagesList() {

    const [currentValues, setCurrentValues] = useState({
        largo: "",
        alto: "",
        ancho: "",
        peso: "",
        contenido: "",
    });


    const isFormInvalid = Object.values(currentValues).some(value => value.trim() === "");

    return (
        <Form.List name="bultos">
            {(fields, { add, remove }) => (
                <> <Typography.Title level={5}>Agrega tus bultos</Typography.Title>
                    <Card style={{ marginBottom: 16, backgroundColor: "#F3F5F9" }}>
                        <Space align="baseline" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                            <Form.Item label="Largo">
                                <Input
                                    addonAfter="cm"
                                    placeholder="Largo"
                                    style={{ width: "100%" }}
                                    value={currentValues.largo}
                                    onChange={(e) => setCurrentValues({ ...currentValues, largo: e.target.value })}
                                />
                            </Form.Item>

                            <Form.Item label="Alto">
                                <Input
                                    addonAfter="cm"
                                    placeholder="Alto"
                                    style={{ width: "100%" }}
                                    value={currentValues.alto}
                                    onChange={(e) => setCurrentValues({ ...currentValues, alto: e.target.value })}
                                />
                            </Form.Item>

                            <Form.Item label="Ancho">
                                <Input
                                    addonAfter="cm"
                                    placeholder="Ancho"
                                    style={{ width: "100%" }}
                                    value={currentValues.ancho}
                                    onChange={(e) => setCurrentValues({ ...currentValues, ancho: e.target.value })}
                                />
                            </Form.Item>

                            <Form.Item label="Peso">
                                <Input
                                    addonAfter="lb"
                                    placeholder="Peso"
                                    style={{ width: "100%" }}
                                    value={currentValues.peso}
                                    onChange={(e) => setCurrentValues({ ...currentValues, peso: e.target.value })}
                                />
                            </Form.Item>

                            <Form.Item label="Contenido">
                                <Input
                                    placeholder="Contenido"
                                    style={{ width: "100%" }}
                                    value={currentValues.contenido}
                                    onChange={(e) => setCurrentValues({ ...currentValues, contenido: e.target.value })}
                                />
                            </Form.Item>
                        </Space>

                        <Row justify="end" style={{ marginTop: 16 }}>
                            <Button
                                type="primary"
                                style={{ backgroundColor: isFormInvalid ? "#D3D3D3" : "#FF4300", borderColor: isFormInvalid ? "#D3D3D3" : "#FF4300", color: "#FFFFFF" }}
                                size="large"
                                onClick={() => {
                                    add(currentValues);
                                    setCurrentValues({ largo: "", alto: "", ancho: "", peso: "", contenido: "" });
                                }}
                                icon={<PlusOutlined />}
                                disabled={isFormInvalid}
                            >
                                Agregar
                            </Button>
                        </Row>
                    </Card>


                    <Typography.Title level={5}>Bultos agregados</Typography.Title>
                    {fields.map(({ key, name, ...restField }) => (
                        <Card style={{ marginBottom: 10, backgroundColor: "#F3F5F9" }} key={key}>
                            <Flex key={key} align="center" style={{ width: "100%", marginBottom: 8 }} justify="space-between">
                                <Form.Item {...restField} name={[name, "largo"]} label="Largo">
                                    <Input addonAfter="cm" placeholder="Largo" style={{ width: "100%" }} />
                                </Form.Item>

                                <Form.Item {...restField} name={[name, "alto"]} label="Alto">
                                    <Input addonAfter="cm" placeholder="Alto" style={{ width: "100%" }} />
                                </Form.Item>

                                <Form.Item {...restField} name={[name, "ancho"]} label="Ancho">
                                    <Input addonAfter="cm" placeholder="Ancho" style={{ width: "100%" }} />
                                </Form.Item>

                                <Form.Item {...restField} name={[name, "peso"]} label="Peso">
                                    <Input addonAfter="lb" placeholder="Peso" style={{ width: "100%" }} />
                                </Form.Item>

                                <Form.Item {...restField} name={[name, "contenido"]} label="Contenido">
                                    <Input placeholder="Contenido" style={{ width: "100%" }} />
                                </Form.Item>


                            </Flex>
                            <Row justify="end">
                                <Button type="primary" ghost danger icon={<DeleteOutlined />} onClick={() => remove(name)} />

                            </Row>
                        </Card>
                    ))}


                </>
            )}
        </Form.List>
    );
}
