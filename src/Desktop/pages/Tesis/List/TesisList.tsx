import { Button, Card, Input, Table } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColumnsType } from 'antd/es/table'
import { useFirestore } from 'reactfire'

import { getTesis } from '../../../API/tesis'
import { Tesis } from '../../../../Types/tesis'
import './TesisList.css'
import { render } from '@testing-library/react'

const TesisList: FunctionComponent = () => {
    const { Search } = Input
    const firestore = useFirestore()
    const navigate = useNavigate()
    const [tesis, setTesis] = useState<Tesis[]>([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setTesis(await getTesis(firestore))
    }

    const columns: ColumnsType<Tesis> = [
        {
            title: 'Enlace',
            dataIndex: 'file',
            key: 'file',
            render: (_tesisUrl: any) => {
                return (
                    <a href={_tesisUrl} target={'_blank'} rel="noreferrer">
                        <img
                            style={{ width: '100px', height: '100px' }}
                            src={`${window.location.origin}/tesis-icono.png`}
                            alt="link-tesis"
                        />
                    </a>
                )
            }
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Escuela',
            dataIndex: 'schoolName',
            key: 'schoolName'
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
            <Table<Tesis> rowKey="id" size="small" pagination={false} bordered dataSource={tesis} columns={columns} />
        </Card>
    )
}

export default TesisList
