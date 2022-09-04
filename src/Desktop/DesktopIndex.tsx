import 'antd/dist/antd.css'
import { FunctionComponent } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './DesktopIndex.css'

const DesktopIndex: FunctionComponent = () => {
    return (
        <div>
            <BrowserRouter>
                {/* <AuthenticationGuard authenticationNode={<Login />}>
                    <NewTesis />
                </AuthenticationGuard> */}
                <App />
            </BrowserRouter>
        </div>
    )
}

export default DesktopIndex
