import { Button, Space } from 'antd'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

const NotAuthorizedPage: FunctionComponent = () => {
    const navigate = useNavigate()
    return (
        <div className="not-authorized-root app-align-center app-margin-top">
            <div className="app-margin-bottom">
                <img style={{ width: '500px' }} src={`${window.location.origin}/noAuthorized.jpeg`} alt="" />
            </div>
            <h2>Área solo para administradores</h2>
            <Space size={15}>
                <Button type="primary" onClick={() => navigate(-1)}>
                    Regresar
                </Button>
                <Button type="primary" onClick={() => navigate('/login')}>
                    Iniciar sesión
                </Button>
            </Space>
        </div>
    )
}

export default NotAuthorizedPage
