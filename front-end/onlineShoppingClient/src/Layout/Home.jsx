import React, { useContext } from 'react';
import { AuthContex } from '../Shared/AuthProvider';

const Home = () => {
    const {user, logOut}=useContext(AuthContex);
    console.log(user)
    return (
        <div>
            <h1>home</h1>
            <h1>Name of user :{user?.displayName}</h1>
           <div>
            <img src={user?.photoURL} alt="" />
           </div>
            
            <button onClick={logOut} className='btn bg-red-400'>Logout</button>
            
        </div>
    );
};

export default Home;