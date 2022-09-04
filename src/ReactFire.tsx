import { FunctionComponent } from 'react'
import { useFirebaseApp, AuthProvider, FirestoreProvider, StorageProvider } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

interface ReactFireProps {
    children: React.ReactNode
}

const ReactFire: FunctionComponent<ReactFireProps> = ({ children }) => {
    const app = useFirebaseApp()
    const auth = getAuth(app)
    const firestore = getFirestore(app)
    const storage = getStorage(app)
    return (
        <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestore}>
                <StorageProvider sdk={storage}>{children}</StorageProvider>
            </FirestoreProvider>
        </AuthProvider>
    )
}

export default ReactFire
