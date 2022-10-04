import { Button, Card, Input, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirestore } from 'reactfire'

import { SchoolNames, Tesis } from '../../../../Types/tesis'
import { getTesis } from '../../../API/tesis'
import './TesisList.css'

interface TesisListFilters {
    schoolName: SchoolNames[]
    description: string
}

const TesisList: FunctionComponent = () => {
    const { Option } = Select
    const firestore = useFirestore()
    const navigate = useNavigate()
    const [tesis, setTesis] = useState<Tesis[]>([])
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState<TesisListFilters>({ schoolName: [], description: '' })

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLoading(true)
        setTesis(await getTesis(firestore))
        setLoading(false)
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

    return (
        <Card>
            <div className="app-align-right app-margin-bottom">
                <Button type="primary" onClick={handleClickLogin}>
                    Iniciar sesión
                </Button>
            </div>
            <div className="app-margin-bottom filters-display-flex" style={{ width: '750px' }}>
                <Space size={15}>
                    <Input
                        placeholder="Buscar por descripción"
                        onChange={(event) => setFilters({ ...filters, description: event.target.value })}
                        allowClear
                    />
                    <Select
                        mode="multiple"
                        placeholder="Buscar por escuela"
                        style={{ minWidth: 200 }}
                        onChange={(event: SchoolNames[]) => setFilters({ ...filters, schoolName: event })}
                        allowClear
                    >
                        {Object.values(SchoolNames).map((name) => (
                            <Option key={name} value={name}>
                                {name}
                            </Option>
                        ))}
                    </Select>
                </Space>
            </div>
            <Table<Tesis>
                rowKey="id"
                size="small"
                pagination={false}
                loading={loading}
                bordered
                dataSource={tesis.filter((_tesis) => {
                    if (filters.description) {
                        if (!_tesis.description.toLowerCase().includes(filters.description.toLowerCase())) {
                            return false
                        }
                    }
                    if (filters.schoolName.length > 0) {
                        if (!filters.schoolName.some((_schoolName) => _tesis.schoolName.includes(_schoolName))) {
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
