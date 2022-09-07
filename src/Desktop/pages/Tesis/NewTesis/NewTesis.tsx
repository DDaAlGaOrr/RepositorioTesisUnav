import { Button, Card, Form, Input, message, Select, Space } from 'antd'
import { signOut } from 'firebase/auth'
import { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useFirestore } from 'reactfire'

import { SchoolNames } from '../../../../Types/tesis'
import { uploadTesisFile } from '../../../API/tesis'
import './NewTesis.css'

const { Option } = Select
const { TextArea } = Input

const NewTesis: FunctionComponent = () => {
    const Auth = useAuth()
    const navigate = useNavigate()
    const firestore = useFirestore()
    const [tesisFile, setTesisFile] = useState()
    const [form] = Form.useForm()

    const handleClickReturnToList = () => {
        navigate('/')
    }
    const handleClickLogOut = () => {
        signOut(Auth)
        navigate('/login')
    }
    const handleFile = (e: any) => {
        setTesisFile(e.target.files[0])
    }
    const messageSuccess = () => {
        message.success('Tesis guardada')
    }
    const error = () => {
        message.error('Algo salio mal')
    }
    const handleSubmit = async (values: any) => {
        const result = await uploadTesisFile(firestore, values, tesisFile)
        result ? (messageSuccess(), form.resetFields()) : error()
    }
    return (
        <div className="new-tesis-root">
            <Card>
                <Space direction="vertical">
                    <Form onFinish={handleSubmit} name="uploadTesis" form={form}>
                        <Form.Item name="schoolName">
                            <Select defaultValue="Selecciona una carrera" style={{ width: 500 }}>
                                {Object.values(SchoolNames).map((name) => (
                                    <Option key={name} value={name}>
                                        {name}
                                    </Option>
                                ))}
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
                                    <Button type="primary" onClick={handleClickReturnToList}>
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
