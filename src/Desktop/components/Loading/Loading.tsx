import { Spin } from 'antd'
import { FunctionComponent } from 'react'

import './Loading.css'

const Loading: FunctionComponent = () => {
    return (
        <div className="root">
            <div className="loading-root">
                <Spin size="large" />
            </div>
        </div>
    )
}

export default Loading
