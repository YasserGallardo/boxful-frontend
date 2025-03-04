"use client";
import { useSession, signIn, signOut } from 'next-auth/react'
import { Form, Input, DatePicker, Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import { config } from "../../../../../config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from 'axios';

const { Option } = Select;

export default function GeneralInformation() {
    const { data: session } = useSession();
    console.log(session);
    const [paises, setPaises] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [departamentoSelected, setDepartamentoSelected] = useState(null);
    const [loading, setLoading] = useState({ paises: true, departamentos: true, municipios: false });


    useEffect(() => {
        const fetchSessionAndCountries = async () => {
            try {
                setLoading({ ...loading, paises: true });
                const response = await axios.get(`${config.API_URL}/external/countries`);
                setPaises(response.data.data);

                setLoading({ ...loading, paises: false });
            } catch (error) {
                console.error("Error:", error);
                setLoading({ ...loading, paises: false });
            }
        };

        fetchSessionAndCountries();
    }, []);
    useEffect(() => {
        const fetchDepartaments = async () => {
            try {
                setLoading({ ...loading, departamentos: true });
                const response = await axios.get(`${config.API_URL}/external/departamentos`);
                setDepartamentos(response.data.data);

                setLoading({ ...loading, departamentos: false });
            } catch (error) {
                console.error("Error:", error);
                setLoading({ ...loading, departamentos: false });
            }
        };

        fetchDepartaments();


    }, []);


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
                        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} placeholder="" />
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
                        <Input
                            addonBefore={
                                <Select
                                    defaultValue="+503"
                                    loading={loading.paises}
                                    options={
                                        paises.length > 0
                                            ? paises
                                                .sort((a, b) =>
                                                    a.extension > b.extension ? 1 : -1
                                                )
                                                .map((pais) => ({
                                                    value: pais.extension,
                                                    label: (
                                                        <>
                                                            <img
                                                                src={pais.flag.png}
                                                                alt={pais.name}
                                                                style={{
                                                                    width: 20,
                                                                    marginRight: 5,
                                                                }}
                                                            />
                                                            {pais.extension}
                                                        </>
                                                    ),
                                                }))
                                            : [
                                                {
                                                    value: "+503",
                                                    label: (
                                                        <>
                                                            <img
                                                                src="https://flagcdn.com/w320/sv.png"
                                                                alt="El Salvador"
                                                                style={{
                                                                    width: 20,
                                                                    marginRight: 5,
                                                                }}
                                                            />
                                                            +503
                                                        </>
                                                    ),
                                                },
                                            ]
                                    }
                                />
                            }
                        />
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
                        <Select placeholder="" options={departamentos ? departamentos.map((departamento) => ({ value: departamento.codigo, label: departamento.nombre })) : []}>
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
                    <Form.Item label="Punto de referencia" name="puntoReferencia">
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
