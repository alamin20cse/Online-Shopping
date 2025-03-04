import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContex } from "../Shared/AuthProvider";




const AddProduct = () => {
  const { user, loading } = useContext(AuthContex);
  const [thumbnail, setThumbnail] = useState(null);
  const[Name, setName] = useState("");
  const[brand, setbrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setcategory] = useState("");
 
  const [Price, setPrice] = useState("");
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  if (loading) return <h1>Loading</h1>

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      Swal.fire("Error", "Please upload a thumbnail image.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("file", thumbnail);
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
    );
    

      const uploadImageURL = await res.json();
      const photoURL = uploadImageURL?.secure_url; // Secure URL

      if (!photoURL) {
        throw new Error("Image upload failed.");
      }

      const campaignData = {
        Name,
        brand,
        thumbnail: photoURL,
        description,
        category,
        Price,
        size,
        color,
       
      
          Username: user.displayName,
          Useremail: user.email,
    
        date: new Date(),
        status: "active",
      };
      console.log(campaignData);

      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData),
      });

      const result = await response.json();

      if (result?.insertedId) {
        Swal.fire("Success", "Product added successfully!", "success");
        e.target.reset();
        setThumbnail(null);
        setIsSubmitting(false);
        navigate("/");
      } else {
        throw new Error("Failed to submit the request.");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred during submission.", "error");
      console.error("Submission error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Add Product</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
           
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">product Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter  Name"
                className="input input-bordered"
                required
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Brand */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Brand Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter  Name"
                className="input input-bordered"
                required
                value={brand}
                onChange={(e) => setbrand(e.target.value)}
              />
            </div>




            {/* category */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">category</span>
              </label>
              <select
                className="select input-bordered"
                required
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Living">Living</option>
                <option value="Beauty">Beauty</option>
                <option value="Sports">Sports</option>
                <option value="others">others</option>
              </select>
            </div>

            {/* Thumbnail */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Thumbnail Image</span>
              </label>
              <input
                type="file"
                className="input input-bordered"
                required
                onChange={handleThumbnailChange}
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Enter campaign description"
                className="textarea textarea-bordered"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>




            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Enter Price"
                className="input input-bordered"
                required
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Size */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Size</span>
              </label>
              <input
                type="text"
                placeholder="Enter size"
                className="input input-bordered"
                required
                value={size}
                onChange={(e) => setsize(e.target.value)}
              />
            </div>
            {/* color */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">color</span>
              </label>
              <input
                type="text"
                placeholder="Enter color"
                className="input input-bordered"
                required
                value={color}
                onChange={(e) => setcolor(e.target.value)}
              />
            </div>
















           

            {/* User Email (Read-Only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                value={user?.email}
                readOnly
              />
            </div>

            {/* User Name (Read-Only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={user?.displayName}
                readOnly
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;