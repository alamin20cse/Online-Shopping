import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../Shared/AuthProvider";





const SignUp = () => {
    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContex);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    const navigate = useNavigate();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    console.log( import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

  

    // Fetch districts on component mount
    useEffect(() => {
        fetch("/public/districts.json")
            .then((res) => res.json())
            .then((data) => setDistricts(data[2]?.data || []))
            .catch((error) => {
                handleError("Error", "Failed to load districts.");
                console.error("Error fetching districts:", error);
            });
    }, []);

    const handleDistrictChange = (e) => {
        const selectedDistrictID = e.target.value;

        // Reset upazilas on district change
        setUpazilas([]);

        // Fetch upazilas and filter by district
        fetch("/public/upazilas.json")
            .then((res) => res.json())
            .then((data) => {
                const filteredUpazilas = data[2]?.data.filter((upazila) => upazila.district_id === selectedDistrictID);
                setUpazilas(filteredUpazilas);
            })
            .catch((error) => {
                handleError("Error", "Failed to load upazilas.");
                console.error("Error fetching upazilas:", error);
            });
    };

    const handleError = (title, message) => {
        Swal.fire({
            icon: "error",
            title,
            text: message,
        });
    };

    return (
        <div className="flex flex-col lg:flex-row-reverse">
            
       <title>Online shopping login</title>
  
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200">
                {/* <Lottie animationData={ani1} /> */}
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100">
                <div className="max-w-sm w-full p-6 shadow-2xl rounded-lg">
                    <h1 className="text-5xl font-bold text-center mb-6">Register now!</h1>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Name"
                                className="input input-bordered"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Email"
                                className="input input-bordered"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input
                                type="file"
                                {...register("photo", { required: "Photo is required" })}
                                className="input input-bordered"
                            />
                            {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
                        </div>
                       
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">District</span>
                            </label>
                            <select
                                {...register("districtID", { required: "District is required" })}
                                className="select input-bordered"
                                onChange={handleDistrictChange}
                            >
                                <option value="">Select a district</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name} ({district.bn_name})
                                    </option>
                                ))}
                            </select>
                            {errors.districtID && <span className="text-red-500 text-sm">{errors.districtID.message}</span> }
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Upazila</span>
                            </label>
                            <select
                                {...register("upazilaID", { required: "Upazila is required" })}
                                className="select input-bordered"
                            >
                                <option value="" disabled>Select an upazila</option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila.id} value={upazila.id}>
                                        {upazila.name} ({upazila.bn_name})
                                    </option>
                                ))}
                            </select>
                            {errors.upazilaID && <span className="text-red-500 text-sm">{errors.upazilaID.message}</span>}
                        </div>
                        
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: passwordRegex,
                                        message: "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
                                    }
                                })}
                                placeholder="Password"
                                className="input input-bordered"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("confirmpassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === getValues("password") || "Passwords do not match"
                                })}
                                placeholder="Confirm Password"
                                className="input input-bordered"
                            />
                            {errors.confirmpassword && <span className="text-red-500 text-sm">{errors.confirmpassword.message}</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Register</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <Link className="text-red-400" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
