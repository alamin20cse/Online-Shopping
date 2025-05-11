
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { useContext } from "react";
import { AuthContex } from "../Shared/AuthProvider";
// import { AuthContext } from "../Shared/AuthProvider";



const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContex)
    const loaction=useLocation();
    if(loading)
    {
        return <Loading></Loading>
    }
    // console.log(user);

    if(user)
    {
        return children;
    }
    else
    {
        return <Navigate state={loaction.pathname} to='/login' > </Navigate>

    }


    
};

export default PrivateRoute;