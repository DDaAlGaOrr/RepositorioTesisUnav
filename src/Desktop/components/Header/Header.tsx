import { FunctionComponent } from 'react'

const HeaderPage: FunctionComponent = () => {
    return (
        <a href="https://unav.edu.mx/">
            <img src={`${window.location.origin}/BLANCO UNAV NEW-NEW-08.png`} style={{ maxWidth: '180px' }} alt="" />
        </a>
    )
}

export default HeaderPage
