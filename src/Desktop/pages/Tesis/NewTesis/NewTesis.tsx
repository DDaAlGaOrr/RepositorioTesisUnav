import { Button, Card, Form, Input, Select, Space } from 'antd'
import { signOut } from 'firebase/auth'
import { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useFirestore } from 'reactfire'

import { uploadTesisFile } from '../../../API/tesis'
import './NewTesis.css'

const { Option } = Select
const { TextArea } = Input

const NewTesis: FunctionComponent = () => {
    const Auth = useAuth()
    const navigate = useNavigate()
    const firestore = useFirestore()
    const [tesisFile, setTesisFile] = useState()
    const handleClickSeeTesis = () => {
        navigate('/')
    }
    const handleClickLogOut = () => {
        signOut(Auth)
        navigate('/login')
    }
    const handleFile = (e: any) => {
        setTesisFile(e.target.files[0])
    }
    const handleSubmit = async (values: any) => {
        const result = await uploadTesisFile(firestore, values, tesisFile)
        console.log(result)
    }
    return (
        <div className="new-tesis-root">
            <Card>
                <Space direction="vertical">
                    <Form onFinish={handleSubmit} name="uploadTesis">
                        <Form.Item name="schoolName">
                            <Select defaultValue="Selecciona una carrera" style={{ width: 500 }}>
                                <Option value="Ingenieria en sistemas">Ingenieria en sistemas </Option>
                                <Option value="Nutrición">Nutrición</Option>
                                <Option value="Teología">Teología</Option>
                                <Option value="Diseño Gráfico">Diseño Gráfico</Option>
                                <Option value="Enfermeria">Enfermeria</Option>
                                <Option value="Gastronomía">Gastronomía</Option>
                                <Option value="Contabilidad">Contabilidad</Option>
                                <Option value="Maestria">Maestria</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="pdfTesis">
                            <Input type={'file'} style={{ width: 500 }} onChange={handleFile} />
                        </Form.Item>
                        <Form.Item name="description">
                            <TextArea placeholder="Descripción" rows={4} style={{ width: 500 }} />
                        </Form.Item>
                        <div className="app-align-center">
                            <Space size={15}>
                                <Form.Item>
                                    <Button type="primary" onClick={handleClickLogOut}>
                                        Cerrar sesión
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={handleClickSeeTesis}>
                                        Ver lista de tesis
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary">
                                        Subir
                                    </Button>
                                </Form.Item>
                            </Space>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    )
}

export default NewTesis
