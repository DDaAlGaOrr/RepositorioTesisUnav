import { FunctionComponent, useState, useEffect, ReactElement } from 'react'
import { useAuth, useFirestore } from 'reactfire'
import { doc, getDoc } from 'firebase/firestore'

import { CollectionName } from './Types/common'
import { User } from './Types/users'

interface AppProps {
    accountUser: User
}

interface ConfirmationPageProps {
    uid: string
    updateAccountUser: (accountUser: User) => void
}

interface AccountUserGuardProps {
    loadingNode: ReactElement
    appNode: FunctionComponent<AppProps>
    confirmationPageNode: FunctionComponent<ConfirmationPageProps>
}

const AccountUserGuard: FunctionComponent<AccountUserGuardProps> = ({
    loadingNode,
    appNode: AppNode,
    confirmationPageNode: ConfirmationPageNode
}) => {
    const auth = useAuth()
    const firestore = useFirestore()
    const [loading, setLoading] = useState(true)
    const [accountUser, setAccountUser] = useState<User | null>(null)

    useEffect(() => {
        async function getAccountUser() {
            if (auth.currentUser?.uid) {
                const accountUserSnap = await getDoc(doc(firestore, CollectionName.Users, auth.currentUser.uid))
                if (accountUserSnap.exists()) {
                    setAccountUser({
                        ...(accountUserSnap.data() as User),
                        id: accountUserSnap.id
                    })
                }
                setLoading(false)
            }
        }
        getAccountUser()
    }, [])

    if (accountUser) {
        return <AppNode accountUser={accountUser} />
    }

    if (auth.currentUser?.uid && !loading) {
        return <ConfirmationPageNode uid={auth.currentUser.uid} updateAccountUser={setAccountUser} />
    }

    return loadingNode
}

export default AccountUserGuard
