import { Button, Card, Input, Table, Space } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColumnsType } from 'antd/es/table'
import { useFirestore } from 'reactfire'

import { getTesis } from '../../../API/tesis'
import { Tesis } from '../../../../Types/tesis'
import './TesisList.css'

interface TesisListFilters {
    schoolName: string
    description: string
}

const TesisList: FunctionComponent = () => {
    const { Search } = Input
    const firestore = useFirestore()
    const navigate = useNavigate()
    const [tesis, setTesis] = useState<Tesis[]>([])
    const [filters, setFilters] = useState<TesisListFilters>({ schoolName: '', description: '' })

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
            <div className="app-margin-bottom filters-display-flex" style={{ width: '750px' }}>
                <Space size={15}>
                    <Input
                        placeholder="Buscar por descripción"
                        onChange={(event) => setFilters({ ...filters, description: event.target.value })}
                        allowClear
                    />
                    <Input
                        placeholder="Buscar escuela"
                        onChange={(event) => setFilters({ ...filters, schoolName: event.target.value })}
                        allowClear
                    />
                </Space>
            </div>
            <Table<Tesis>
                rowKey="id"
                size="small"
                pagination={false}
                bordered
                dataSource={tesis.filter((_tesis) => {
                    if (filters.description) {
                        if (!_tesis.description.toLowerCase().includes(filters.description.toLowerCase())) {
                            return false
                        }
                    }
                    if (filters.schoolName) {
                        if (!_tesis.schoolName.toLowerCase().includes(filters.schoolName.toLowerCase())) {
                            return false
                        }
                    }

                    return true
                })}
                columns={columns}
            />
        </Card>
    )
}

export default TesisList
