import React from 'react'
import ReactDOM from 'react-dom/client'
import { FirebaseAppProvider } from 'reactfire'

import DesktopIndex from './Desktop/DesktopIndex'
import firebaseConfig from './firebaseConfig'
import './index.css'
import ReactFire from './ReactFire'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <ReactFire>
                <React.Suspense fallback={<span />}>
                    <DesktopIndex />
                </React.Suspense>
            </ReactFire>
        </FirebaseAppProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
