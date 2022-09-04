import { Button, Card, Form, Input, Space } from 'antd'

import { signInWithEmailAndPassword } from 'firebase/auth'

import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'reactfire'

import './Login.css'

const Login: FunctionComponent = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        await signInWithEmailAndPassword(auth, values.username, values.password)
            .then(() => {
                console.log('login!!!')
                navigate('/newTesis')
            })
            .catch((error) => {
                console.log(error.code)
            })
    }

    return (
        <div className="authentication-page-root">
            <div className="authentication-page-flex">
                <div className="authentication-page-card">
                    <Card>
                        <h2>Repositorio de tesis UNAV</h2>
                        <Form
                            name="login"
                            onFinish={onFinish}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            style={{ textAlign: 'center' }}
                        >
                            <Form.Item label="Usuario" name="username" rules={[{ required: true, message: 'Ingrese un usuario' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Ingrese su contraseña' }]}>
                                <Input.Password />
                            </Form.Item>

                            <div className="app-align-center">
                                <Form.Item noStyle>
                                    <Space size={15}>
                                        <Button type="primary" onClick={() => navigate('/')}>
                                            Regresar a ver tesis
                                        </Button>
                                        <Button type="primary" htmlType="submit">
                                            Iniciar sesión
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login
