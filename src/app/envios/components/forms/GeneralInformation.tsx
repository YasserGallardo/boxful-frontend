"use client";
import { useEffect, useState } from "react";
import { Form, Input, DatePicker, Row, Col, Select, FormInstance } from "antd";
import axios from "axios";
import { config } from "../../../../../config";

export default function GeneralInformation({ form, setNombreDepartamento }: { form: FormInstance, setNombreDepartamento: Function }) {
    const [paises, setPaises] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [departamentoSelected, setDepartamentoSelected] = useState(null);
    const [loading, setLoading] = useState({ paises: true, departamentos: true, municipios: false });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [countriesResponse, departamentsResponse] = await Promise.all([
                    axios.get(`${config.API_URL}/external/countries`),
                    axios.get(`${config.API_URL}/external/departamentos`)
                ]);
                setPaises(countriesResponse.data.data);
                setDepartamentos(departamentsResponse.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(prev => ({ ...prev, paises: false, departamentos: false }));
            }
        };
        fetchData();
    }, []);

    const handleDepartamentoChange = async (value) => {
        try {
            form.setFieldsValue({ municipio: undefined });
            setDepartamentoSelected(value);
            setLoading(prev => ({ ...prev, municipios: true }));

            const response = await axios.get(`${config.API_URL}/external/municipios/${value}`);
            setMunicipios(response.data.data);

            const departamento = departamentos.find(dep => dep.codigo === value);
            setNombreDepartamento(departamento ? departamento.nombre : "");
        } catch (error) {
            console.error("Error fetching municipios:", error);
        } finally {
            setLoading(prev => ({ ...prev, municipios: false }));
        }
    };

    return (
        <>
            <Row gutter={16}>
                <Col span={18}>
                    <Form.Item label="📍Dirección de recolección" name="direccionEnvio" rules={[{ required: true, message: "Ingrese la dirección de recolección" }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="📆 Fecha programada" name="fechaProgramada" rules={[{ required: true, message: "Seleccione la fecha programada" }]}>
                        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                {[
                    { label: "Nombre", name: "nombre", message: "Ingrese su nombre" },
                    { label: "Apellidos", name: "apellido", message: "Ingrese sus apellidos" },
                    { label: "Correo Electrónico", name: "email", message: "Ingrese su correo", type: "email" }
                ].map(({ label, name, message, type }, index) => (
                    <Col span={8} key={name}>
                        <Form.Item label={label} name={name} rules={[{ required: true, message }, type === "email" && { type: "email", message: "Ingrese un correo válido" }].filter(Boolean)}>
                            <Input />
                        </Form.Item>
                    </Col>
                ))}
            </Row>
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item label="Teléfono" name="telefono" rules={[{ required: true, message: "Ingrese su teléfono" }, { pattern: /^\d{8}$/, message: "Ingrese un teléfono válido de 8 dígitos" }]}>
                        <Input addonBefore={
                            <Select defaultValue="+503" loading={loading.paises} options={paises.length ? paises.map(pais => ({ value: pais.extension, label: (<><img src={pais.flag.png} alt={pais.name} style={{ width: 20, marginRight: 5 }} />{pais.extension}</>) })) : [{ value: "+503", label: (<><img src="https://flagcdn.com/w320/sv.png" alt="El Salvador" style={{ width: 20, marginRight: 5 }} />+503</>) }]} />
                        } />
                    </Form.Item>
                </Col>
                <Col span={18}>
                    <Form.Item label="📮Dirección de destinatario" name="direccion" rules={[{ required: true, message: "Ingrese la dirección del destinatario" }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                {[
                    { label: "Departamento", name: "departamento", message: "Seleccione el departamento", onChange: handleDepartamentoChange, options: departamentos.map(dep => ({ value: dep.codigo, label: dep.nombre })), loading: loading.departamentos, disabled: loading.departamentos },
                    { label: "Municipio", name: "municipio", message: "Seleccione el municipio", options: municipios.map(mun => ({ value: mun.nombre, label: mun.nombre })), loading: loading.municipios, disabled: !departamentoSelected || loading.municipios },
                    { label: "Punto de referencia", name: "puntoReferencia" }
                ].map(({ label, name, message, onChange, options, loading, disabled }, index) => (
                    <Col span={8} key={name}>
                        <Form.Item label={label} name={name} rules={message ? [{ required: true, message }] : []}>
                            {options ? (
                                <Select placeholder="" onChange={onChange} options={options} loading={loading} disabled={disabled} />
                            ) : (
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                ))}
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
