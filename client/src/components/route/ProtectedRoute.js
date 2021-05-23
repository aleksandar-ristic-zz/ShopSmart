import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  
  const { isAuth, loading, user} = useSelector(state => state.auth)
  
  return !loading && ( <Route {...rest} 
    render={props => {
      if (!isAuth) {
        return <Redirect to='login' />;
      }
      return <Component {...props} />;
    }}
  />)
}

export default ProtectedRoute
