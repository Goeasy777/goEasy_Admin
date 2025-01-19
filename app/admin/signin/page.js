"use client";
import { useRouter } from "next/navigation";
import { adminsignin } from "@/store/Actions/adminActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { isAuthenticated, errors } = useSelector(
    (state) => state.adminReducer
  );

  const SigninHandler = async (e) => {
    e.preventDefault();
    const admin = { username, password };

    try {
      const response = await dispatch(adminsignin(admin));

      if (response.data && response.data.success) {
        setShowAlert({
          type: "success",
          message: "Admin Login Successfully!",
        });
      } else {
        // Check if response.message exists, otherwise provide a default message
        setShowAlert({
          type: "error",
          message: response.data?.message || "Failed to Login Admin",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: "Failed to Login Admin",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    // Show toast error message when there’s an error
    if (errors) {
      toast.error(errors, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [errors]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
    else{
      router.push("/admin/signin");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <section className="bg-gray-100 dark:bg-gray-900 absolute left-0 top-0 h-screen w-screen z-50">
        {showAlert && (
          <Alert
            className="absolute w-80 top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            icon={
              showAlert.type === "success" ? (
                <CheckIcon fontSize="inherit" />
              ) : null
            }
            severity={showAlert.type}
          >
            {showAlert.message}
          </Alert>
        )}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0 bg-blue-50">
          <div className="w-full max-w-lg sm:max-w-sm bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="pt-5 flex items-center justify-center">
              <img className="w-16 h-16" src="/logo.png" alt="logo" />
            </div>
            <div className="px-6 py-4 space-y-4 md:space-y-6">
              <h1 className="text-xl font-semibold text-center leading-tight tracking-tight text-gray-900 dark:text-white opacity-90">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-4" onSubmit={SigninHandler}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 opacity-70 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    placeholder="Username"
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white border text-sm border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 opacity-70 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border text-sm border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full mt-5 mb-1 text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md shadow-sm text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Login
                  </button>
                  <p className="text-sm text-center">
                    Don't have an account?{" "}
                    <Link
                      href={"/admin/signup"}
                      className="underline font-semibold text-blue-500"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;
