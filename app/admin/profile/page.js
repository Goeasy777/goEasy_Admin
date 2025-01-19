"use client";
import Button from "@/components/Button";
import { addGopoints, resetPassword, updateAdmin } from "@/store/Actions/adminActions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";

const page = () => {

  const router = useRouter();

  const { admin, isAuthenticated, errors } = useSelector(
    (state) => state.adminReducer
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const dispatch = useDispatch();

  const [username, setUsername] = useState(admin?.username || "");
  const [fullname, setFullname] = useState(admin?.fullname || "");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState(admin?.contact || "");
  const [gopoints, setGoPoints] = useState(admin?.gopoints || "");
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);



  const updateAdminHandler = (e) => {
    e.preventDefault();

    const adminData = {
      username: username || admin.username,
      fullname: fullname || admin.fullname,
      contact: contact || admin.contact,
      // gopoints: gopoints || admin.gopoints
    };

    dispatch(updateAdmin(adminData));

    setShowAlert1(true);
    setTimeout(() => setShowAlert1(false), 3000);
  };

  const ResetPasswordHandler = (e) => {
    e.preventDefault();

    dispatch(resetPassword({ password }));
    setPassword("");
    setShowAlert2(true);
    setTimeout(() => setShowAlert2(false), 3000);
  };

  const updategopointsAdminHandler = (e) => {
    e.preventDefault();

    const adminData = {
      gopoints: gopoints || admin.gopoints
    };

    dispatch(updateAdmin(adminData));

    setShowAlert3(true);
    setTimeout(() => setShowAlert3(false), 3000);
  };

  useEffect(() => { }, [username, fullname, password, contact, gopoints]);

  return (
    <div className="h-full flex flex-col gap-5">

      <div className="relative h-fit w-full flex flex-col py-10 px-14 gap-6 bg-formBG rounded-md">
        <div className="py-3 px-8 flex justify-between items-center text-xl w-full  border-none rounded-sm shadow-sm bg-headerBG">
          <h1 className="text-textBlack">Update Admin</h1>
        </div>

        {showAlert1 && (
          <Alert
            className="absolute w-80 top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
          >
            Update successfully!
          </Alert>
        )}

        <form
          className="flex flex-col gap-3 items-start"
          onSubmit={updateAdminHandler}
        >
          <div className="grid grid-cols-2 gap-3 w-full h-full">
            <div className="flex flex-col h-fit w-full gap-1">
              <h4 className="ml-3 text-lg text-textBlack">Username</h4>
              <input
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 border-none bg-inputBG shadow-sm"
                type="text"
                placeholder="Username"
              />
            </div>

            <div className="flex flex-col h-fit w-full gap-1">
              <h4 className="ml-3 text-lg text-textBlack">Fullname</h4>
              <input
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="p-3 border-none bg-inputBG shadow-sm"
                type="text"
                placeholder="Fullname"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full h-full">
            <div className="flex flex-col h-fit w-full gap-1">
              <h4 className="ml-3 text-lg text-textBlack">Contact</h4>
              <input
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="p-3 border-none bg-inputBG shadow-sm"
                type="text"
                placeholder="Contact"
              />
            </div>
          </div>

          <Button props={"Update"} />
        </form>
      </div>

      <div className="grid grid-cols-2 w-full gap-4">

        <div className="relative h-fit w-full flex flex-col py-10 px-14 gap-6 bg-formBG rounded-md">
          <div className="py-3 px-8 flex justify-between items-center text-xl w-full  border-none rounded-sm shadow-sm bg-headerBG">
            <h1 className="text-textBlack">Reset Admin Password</h1>
          </div>

          {showAlert2 && (
            <Alert
              className="absolute w-80 top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
            >
              Reset Password successfully!
            </Alert>
          )}

          <form
            onSubmit={ResetPasswordHandler}
            className="flex flex-col gap-3 items-start"
          >
            <div className="flex flex-col h-fit w-full gap-2">
              <h4 className="ml-3 text-lg text-textBlack">Password</h4>
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border-none bg-inputBG shadow-sm"
                type="password"
                placeholder="********"
              />
            </div>
            <Button props={"Reset Password"} />
          </form>
        </div>

        <div className="relative h-fit w-full flex flex-col py-10 px-14 gap-6 bg-formBG rounded-md">
          <div className="py-3 px-8 flex justify-between items-center text-xl w-full  border-none rounded-sm shadow-sm bg-headerBG">
            <h1 className="text-textBlack">Add Go Points</h1>
          </div>

          {showAlert3 && (
            <Alert
              className="absolute w-80 top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
            >
              Added successfully!
            </Alert>
          )}

          <form
            className="flex flex-col gap-3 items-start"
            onSubmit={updategopointsAdminHandler}
          >
            <div className="flex flex-col h-fit w-full gap-1">
              <h4 className="ml-3 text-lg text-textBlack">Go Points</h4>
              <input
                name="gopoints"
                value={gopoints}
                onChange={(e) => setGoPoints(e.target.value)}
                className="p-3 border-none bg-inputBG shadow-sm"
                type="text"
                placeholder="Go Points"
              />
            </div>

            <Button props={"Add Go Points"} />
          </form>

        </div>

      </div>

      <div className="grid grid-cols-2 w-full gap-4">

        <div className="relative h-fit w-full flex flex-col py-10 px-14 gap-6 bg-formBG rounded-md items-center">
          <div className="py-3 px-8 flex justify-between items-center text-xl w-full  border-none rounded-sm shadow-sm bg-headerBG">
            <h1 className="text-textBlack">Go To Cancellation Points</h1>
          </div>
          <Link href="/admin/profile/tags" className="w-1/2 mt-3 bg-buttonBG outline-none text-white py-3 px-5 text-sm rounded-md text-center" >Add Points</Link>
          {/* <LinkButton url="/admin/profile/tags" value="Add Points" /> */}
        </div>

      </div>


    </div>
  );
};

export default page;

