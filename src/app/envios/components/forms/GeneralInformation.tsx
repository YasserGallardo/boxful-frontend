"use client";
import { useSession } from 'next-auth/react'
import { Form, Input, DatePicker, Row, Col, Select, FormInstance } from "antd";
import { useEffect, useState } from "react";
import { config } from "../../../../../config";
import axios from 'axios';


export default function GeneralInformation({ form, setNombreDepartamento }: { form: FormInstance, setNombreDepartamento: Function }) {
    const [paises, setPaises] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [departamentoSelected, setDepartamentoSelected] = useState(null);
    const [loading, setLoading] = useState({ paises: true, departamentos: true, municipios: false });


    useEffect(() => {
        const fetchSessionAndCountries = async () => {
            try {
                setLoading({ ...loading, paises: true, departamentos: true });
                const [countriesResponse, departamentsResponse] = await Promise.all([
                    axios.get(`${config.API_URL}/external/countries`),
                    axios.get(`${config.API_URL}/external/departamentos`),
                ]);
                setPaises(countriesResponse.data.data);
                setDepartamentos(departamentsResponse.data.data);

                setLoading({ ...loading, paises: false, departamentos: false });
            } catch (error) {
                console.error("Error:", error);
                setLoading({ ...loading, paises: false, departamentos: false });
            }
        };

        fetchSessionAndCountries();
    }, []);
    const handleDepartamentoChange = async (value) => {
        try {
            form.setFieldsValue({ municipio: undefined });
            setDepartamentoSelected(value);
            setLoading({ ...loading, municipios: true });

            const response = await axios.get(`${config.API_URL}/external/municipios/${value}`);
            setMunicipios(response.data.data);

            const departamento = departamentos.find((dep) => dep.codigo === value);
            setNombreDepartamento(departamento ? departamento.nombre : '');

            setLoading({ ...loading, municipios: false });
        } catch (error) {
            console.error("Error:", error);
            setLoading({ ...loading, municipios: false });
        }
    }


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
                        rules={[
                            { required: true, message: "Ingrese su teléfono" },
                            { pattern: new RegExp(/^\d{8}$/), message: "Ingrese un teléfono válido de 8 dígitos" },
                        ]}

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
                        <Select placeholder="" onChange={handleDepartamentoChange} options={departamentos ? departamentos.map((departamento) => ({ value: departamento.codigo, label: departamento.nombre })) : []} loading={loading.departamentos} disabled={loading.departamentos} />

                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Municipio"
                        name="municipio"
                        rules={[{ required: true, message: "Seleccione el municipio" }]}
                    >
                        <Select placeholder="" disabled={!departamentoSelected || loading.municipios} options={municipios ? municipios.map((municipio) => ({ value: municipio.nombre, label: municipio.nombre })) : []} loading={loading.municipios} />

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
