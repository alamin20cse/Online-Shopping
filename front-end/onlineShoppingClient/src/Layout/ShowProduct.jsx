import React from 'react';
import useProduct from '../Shared/useProduct';
import { Link } from 'react-router-dom';


const ShowProduct = () => {
    const [allproducts, loading, refetch] = useProduct();

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div className="p-4">
          
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {allproducts.map((product) => (
                    <div key={product._id} className="border p-4 rounded-lg shadow-md">
                        <img
                            src={product.thumbnail}
                            alt={product.Name}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <h3 className="text-lg font-semibold mt-2">{product.Name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Brand:</strong> {product.brand}</p>
                        <p><strong>Price:</strong> ${product.Price}</p>
                        <p><strong>Size:</strong> {product.size}</p>
                        <p><strong>Color:</strong> {product.color}</p>
                        <p><strong>Seller:</strong> {product.Username} ({product.Useremail})</p>
                        <p><strong>Status:</strong> {product.status}</p>
                        <p className="text-sm text-gray-500">
                            <strong>Posted on:</strong> {new Date(product.date).toLocaleDateString()}
                        </p>
                       <Link to={`/payment/${product._id}`}> <button className='btn btn-primary'>By now</button></Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowProduct;