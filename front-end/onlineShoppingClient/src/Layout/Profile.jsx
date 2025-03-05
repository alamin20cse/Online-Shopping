import React from 'react';
import useUsers from '../Hooks/useUsers';

const Profile = () => {
    const [users, loading, refetch]=useUsers()
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            {users && users.length > 0 && users.map(user => (
                <div key={user._id} className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
                    <img 
                        src={user.photo} 
                        alt={user.name} 
                        className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-500"
                    />
                    <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
                    <p className="text-gray-600 text-sm">Email : {user.email}</p>
                    <p className="text-gray-700 mt-2">District Name :{user.districtName} ({user.districtNameBan}) </p>
                    <p className="text-gray-700 mt-2">Upazila Name : {user.upazilaName}({user.upazilaNameBan}) </p>
                    <p className={`mt-2 px-3 py-1 inline-block text-sm font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.status.toUpperCase()}
                    </p>


                    <p className={`mt-2 px-3 py-1 inline-block text-sm font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.role.toUpperCase()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Profile;
