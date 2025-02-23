import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeMain = () => {
    return (
        <div>
            <Outlet></Outlet>
            
        </div>
    );
};

export default HomeMain;