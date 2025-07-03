import { useAuth } from '../../contexts/AuthContext'
import Login from './Login'
import Loading from '../Loading'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return children
}

export default ProtectedRoute
