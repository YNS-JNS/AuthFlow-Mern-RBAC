// import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    // const {currentUser} = useSelector(state => state.user)
    const token = !!localStorage.getItem('userToken');
    
  return token ? <Outlet/> : <Navigate to='/login'/>
};