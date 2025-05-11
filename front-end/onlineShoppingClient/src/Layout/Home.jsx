import React, { useContext } from 'react';
import { AuthContex } from '../Shared/AuthProvider';
import useProduct from '../Shared/useProduct';
import ShowProduct from './ShowProduct';

const Home = () => {
    const {user, logOut}=useContext(AuthContex);
    const [allproducts, loading, refetch]=useProduct();
    
    // console.log(user)
    console.log(allproducts);
    return (
        <div>
            <ShowProduct></ShowProduct>
            
        </div>
    );
};

export default Home;