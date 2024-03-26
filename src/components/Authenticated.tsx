// for to make only authenticated users to access the app, we can use this Authenticated component

import React from 'react'
import { useStore } from '../app/store'


interface AuthenticatedProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}


const Authenticated : React.FC<AuthenticatedProps> = ({ children, fallback }) => {

    const { accessToken } = useStore()
    
    if (!accessToken) {
        return fallback ? fallback : null
    }
    
    return (
        <>
            {children}
        </>
    )
}

export default Authenticated