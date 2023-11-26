import React, { useContext } from "react";
import { Link, useLocation, useNavigation } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";

const Signup = () => {
  const { signUpWithGmail, createUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    createUser(email, password).then((result) => {
      // Signed up 
      const user = result.user;
      alert("Signin successful!");
        navigate(from, { replace: true });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`${errorMessage}`)
      // ..
    });
  };

    // login with google
    const handleRegister = () => {
      signUpWithGmail()
        .then((result) => {
          const user = result.user;
          navigate(from, { replace: true });
        })
        .catch((error) => console.log(error));
    };
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
      <form
        className="card-body"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-bold text-lg">Please Create An Account!</h3>
        {/* name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="name"
            placeholder="Your name"
            className="input input-bordered"
            {...register("name")}
          />
        </div>

        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            {...register("email")}
          />
        </div>

        {/* password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("password")}
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover mt-2">
              Forgot password?
            </a>
          </label>
        </div>

        {/* error message */}
        <p>{errors.message}</p>

        {/* submit btn */}
        <div className="form-control mt-6">
          <input
            type="submit"
            className="btn bg-green text-white"
            value="Sign up"
          />
        </div>

        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <Link to="/">✕</Link>
        </button>

        <div className="text-center my-2">
          Have an account?
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="ml-2 underline"
          >
            {" "}
            Login here
          </button>

        </div>
      </form>
      <div className="text-center space-x-3">
          <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
