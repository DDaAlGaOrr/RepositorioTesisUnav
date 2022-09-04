import { Button, Card, Input, Table } from 'antd'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

import './TesisList.css'

const TesisList: FunctionComponent = () => {
    const { Search } = Input
    const navigate = useNavigate()
    const dataSource = [
        {
            key: '1',
            url: 'Imagen',
            description: 'Descripción de la tesis',
            school: 'Ingenieria'
        },
        {
            key: '2',
            url: 'Imagen',
            description: 'Descripción de la tesis',
            school: 'Ingenieria'
        }
    ]
    const columns = [
        {
            title: 'Enlace',
            dataIndex: 'url',
            key: 'name'
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'age'
        },
        {
            title: 'Escuela',
            dataIndex: 'school',
            key: 'address'
        }
    ]
    const handleClickLogin = () => {
        navigate('/newTesis')
    }
    const onSearch = () => {
        console.log('buscando')
    }

    return (
        <Card>
            <div className="app-align-right app-margin-bottom">
                <Button type="primary" onClick={handleClickLogin}>
                    Agregar nueva tesis
                </Button>
            </div>
            <div className="app-align-center app-margin-bottom">
                <Search style={{ width: '550px' }} placeholder="Buscar Tesis" onSearch={onSearch} enterButton />
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </Card>
    )
}

export default TesisList
