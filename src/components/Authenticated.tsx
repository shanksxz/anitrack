// Desc: Component to check if user is authenticated
import { useStore } from '../app/store'

interface AuthenticatedProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

const Authenticated : React.FC<AuthenticatedProps> = ({ children, fallback }) => {
    // get accessToken from store
    const { accessToken } = useStore()
    
    if (!accessToken) {
        // if no accessToken, return fallback or null
        return fallback ? fallback : null
    }
    
    return <>{children}</>
}

export default Authenticated