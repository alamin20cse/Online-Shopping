import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
  

    // Fetch districts on component mount
    useEffect(() => {
        fetch("districts.json")
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
        fetch("upazilas.json")
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

  
    return (
   
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign UP</h1>
      <p className="py-6">
       Anamation will add
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="text-5xl font-bold">Sign UP</h1>





      <form onSubmit={handleSubmit(onSubmit)} className="card-body">



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
                            {/* {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>} */}
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
                            {/* {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>} */}
                        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register("email")} type="email" placeholder="email" className="input input-bordered" required />
        </div>
        {/* district and upzila will be added here with dopwon  */}

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
                            {/* {errors.districtID && <span className="text-red-500 text-sm">{errors.districtID.message}</span>} */}
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
                            {/* {errors.upazilaID && <span className="text-red-500 text-sm">{errors.upazilaID.message}</span>} */}
                        </div>






        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input  {...register("password")} type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
    )
};

export default SignUp;