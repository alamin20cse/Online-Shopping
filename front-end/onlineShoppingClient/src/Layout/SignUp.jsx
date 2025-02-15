import React from 'react';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
  
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