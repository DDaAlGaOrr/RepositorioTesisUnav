import { Button, Card, Form, Input, Space, notification } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'reactfire'

import './Login.css'

const Login: FunctionComponent = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: any) => {
        setLoading(true)
        await signInWithEmailAndPassword(auth, values.username, values.password)
            .then(() => {
                navigate('/newTesis')
            })
            .catch((error) => {
                let errorMessage = ''
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'El Usuario no Existe'
                        break
                    case 'auth/wrong-password':
                        errorMessage = 'Contraseña Incorrecta'
                        break
                    case 'auth/too-many-requests':
                        errorMessage =
                            'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde'
                        break
                    default:
                        errorMessage = error.message
                        break
                }
                notification.error({
                    message: 'Error',
                    description: errorMessage
                })
                console.log(error.code, error.message)
                setLoading(false)
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
                            style={{ textAlign: 'center' }}
                        >
                            <Form.Item label="Usuario" name="username" rules={[{ required: true, message: 'Ingrese un usuario' }]}>
                                <Input disabled={loading} />
                            </Form.Item>

                            <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Ingrese su contraseña' }]}>
                                <Input.Password disabled={loading} />
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
