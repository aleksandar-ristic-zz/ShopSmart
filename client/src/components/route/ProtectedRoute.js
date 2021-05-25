import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({isAdmin, component: Component, ...rest }) => {
  
  const { isAuth, loading, user} = useSelector(state => state.auth)
  
  return (loading === false && ( <Route {...rest} 
    render={props => {
      if (isAuth === false) {
        return <Redirect to='login' />;
      }

      if (isAdmin === true && user.role !== 'admin') {
        return <Redirect to="/" />
      }

      return <Component {...props} />;
    
    }}
  />))
}

export default ProtectedRoute
