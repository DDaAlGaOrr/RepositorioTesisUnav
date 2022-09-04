import { Button, Card, Form, Input, Select, Space } from 'antd'
import { signOut } from 'firebase/auth'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useUser } from 'reactfire'

import './NewTesis.css'

const { Option } = Select
const { TextArea } = Input

const NewTesis: FunctionComponent = () => {
    const userSession = useUser()
    const Auth = useAuth()
    const navigate = useNavigate()
    const handleClickSeeTesis = () => {
        navigate('/')
    }

    const handleClickLogOut = () => {
        signOut(Auth)
        navigate('/login')
    }
    console.log(userSession)

    return (
        <div className="new-tesis-root">
            <Card>
                <Space direction="vertical">
                    <Form>
                        <Form.Item>
                            <Select defaultValue="Selecciona una carrera" style={{ width: 500 }}>
                                <Option value="Ingenieria en sistemas">Ingenieria en sistemas </Option>
                                <Option value="Ciencias de la educacion">Ciencias de la educacion</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input type={'file'} style={{ width: 500 }} />
                        </Form.Item>
                        <Form.Item>
                            <TextArea placeholder="Descripción" rows={4} style={{ width: 500 }} />
                        </Form.Item>
                        <div className="app-align-center">
                            <Space size={15}>
                                <Button type="primary" onClick={handleClickLogOut}>
                                    Cerrar sesión
                                </Button>
                                <Button type="primary" onClick={handleClickSeeTesis}>
                                    Ver lista de tesis
                                </Button>
                                <Button type="primary">Subir</Button>
                            </Space>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    )
}

export default NewTesis
