


import { Navigate, useLocation } from 'react-router-dom';
import useUsers from '../Hooks/useUsers';
import Loading from './Loading';

const AdminRoute = ({children}) => {
    const  [users, loading]=useUsers();
    const loaction=useLocation();
    if(loading||loading)
    {
        return <Loading></Loading>
    }
    // console.log(users)
    // console.log(users[0].role);
    

    if(users[0].role==='admin')
    {
        return children;
    }
    else
    {
        return <Navigate state={loaction.pathname} to='/login' > </Navigate>

    }


    
};


export default AdminRoute;