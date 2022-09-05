import { Layout } from 'antd'
import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useUser } from 'reactfire'

import '../App.css'
import HeaderPage from './components/Header/Header'
import Login from './pages/Login/Login'
import NotAuthorizedPage from './pages/NotAuthorized/NotAuthorizedPage'
import TesisList from './pages/Tesis/List/TesisList'
import NewTesis from './pages/Tesis/NewTesis/NewTesis'

const App: FunctionComponent = () => {
    const { Header, Content } = Layout
    const sessionUser = useUser()

    return (
        <Layout>
            <Header>
                <HeaderPage />
            </Header>
            <Content>
                <Routes>
                    <Route path="/newTesis" element={sessionUser.data ? <NewTesis /> : <NotAuthorizedPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<TesisList />} />
                </Routes>
            </Content>
        </Layout>
    )
}

export default App
