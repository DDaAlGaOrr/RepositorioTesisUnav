import { FunctionComponent, ReactElement } from 'react'
import { useSigninCheck } from 'reactfire'

import Loading from './Desktop/components/Loading/Loading'

interface AuthenticationGuardProps {
    children: ReactElement
    authenticationNode: ReactElement
}

const AuthenticationGuard: FunctionComponent<AuthenticationGuardProps> = ({ children, authenticationNode }) => {
    const { status: authenticationStatus, data: authenticationData } = useSigninCheck()

    if (authenticationStatus === 'loading') {
        return <Loading />
    }

    return authenticationData.signedIn ? children : authenticationNode
}

export default AuthenticationGuard
