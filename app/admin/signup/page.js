"use client";
import { adminsignup } from "@/store/Actions/adminActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { AdminDataContext } from "@/components/wrapper/AdminContext";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [gopoints, setGopoints] = useState("");
  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // const { admin, setAdmin } = React.useContext(AdminDataContext);

  const SignupHandler = async (e) => {
    e.preventDefault();
    const newadmin = { username, password, fullname, contact, gopoints };
    try {
      const response = await dispatch(adminsignup(newadmin));
      if (response.data.success) {
        setShowAlert({
          type: "success",
          message: "Admin Created Successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to Create Admin",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }

    setUsername("");
    setPassword("");
    setFullname("");
    setContact("");
  };
  return (
    <div>
      <section className="bg-gray-100 dark:bg-gray-900 absolute left-0 top-0 h-screen w-screen z-50">
        {showAlert && (
          <Alert
            className="absolute w-80 top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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

        <div className="flex flex-col items-center justify-center px-4 py-6 mx-auto h-full sm:px-6 lg:px-8 bg-blue-50">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700">
            <div className="pt-5 flex items-center justify-center">
              <img className="w-16 h-16" src="/logo.png" alt="logo" />
            </div>

            <div className="px-6 py-4 space-y-4 sm:space-y-6">
              <h1 className="text-lg sm:text-xl font-semibold text-center leading-tight tracking-tight text-gray-900 dark:text-white opacity-90">
                New Account
              </h1>

              <form className="space-y-3" onSubmit={SignupHandler}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm opacity-70 font-medium text-gray-900 dark:text-white"
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
                    className="bg-white border border-gray-300 text-sm rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm opacity-70 font-medium text-gray-900 dark:text-white"
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
                    className="bg-white border border-gray-300 text-sm rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm opacity-70 font-medium text-gray-900 dark:text-white"
                  >
                    Fullname
                  </label>
                  <input
                    placeholder="Fullname"
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="bg-white border border-gray-300 text-sm rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm opacity-70 font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    placeholder="Contact"
                    type="number"
                    name="contact"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="bg-white border border-gray-300 text-sm rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full mt-5 mb-1 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md shadow-sm text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Signup
                  </button>
                  <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link
                      href={"/admin/signin"}
                      className="underline font-semibold text-blue-500"
                    >
                      Login
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

export default Signup;
