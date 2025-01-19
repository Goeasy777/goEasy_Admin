// "use client";
// import Button from "@/components/Button";
// import { addTimeSlot } from "@/store/Actions/adminActions";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// const page = ({ params }) => {
//   const [selectCategory, setSelectCategory] = useState(""); // Initialize with empty string
//   const [nextdate, setNextdate] = useState(""); // Initialize with empty string
//   const [dateday, setDateday] = useState(""); // Track the category status
//   //   const [image, setImage] = useState(null); // Track the category image
//   const [selectTimes, setSelectTimes] = useState([]);
//   const [timedata, setTimedata] = useState("");
//   const [timeslotlist, setTimeslotlist] = useState(null); // Track the category image
//   const [timeslots, setTimeslots] = useState([]);
//   const [date, setDate] = useState(new Date());
//   const [categoriesList, setCategoriesList] = useState();
//   const timeslot = [
//     "08:00AM",
//     "08:30AM",
//     "09:00AM",
//     "09:30AM",
//     "10:00AM",
//     "10:30AM",
//     "11:00AM",
//     "11:30AM",
//     "12:00PM",
//     "12:30PM",
//     "01:00PM",
//     "01:30PM",
//     "02:00PM",
//     "02:30PM",
//     "03:00PM",
//     "03:30PM",
//     "04:00PM",
//     "04:30PM",
//     "05:00PM",
//     "05:30PM",
//     "06:00PM",
//     "06:30PM",
//     "07:00PM",
//     "07:30PM",
//     "08:00PM",
//   ];

//   const dispatch = useDispatch();
//   const handleCheckboxChange = (e) => {
//     const value = e.target.value;
//     // const updatedTimeslot = timeslots.includes(value)
//     //   ? timeslots.filter((key) => key !== value)
//     //   : [...timeslots, value];
//     // // setTimeslots(updatedTimeslot);
//     // setTimeslotlist(JSON.stringify(updatedTimeslot));
//     // console.log(timeslots);
//     // console.log(timeslotlist);

//     setTimeslots((prevTimeslots) => {
//       const updatedTimeslot = prevTimeslots.includes(value)
//         ? prevTimeslots.filter((key) => key !== value)
//         : [...prevTimeslots, value];

//       // Update the timeslotlist as a JSON string
//       setTimeslotlist(JSON.stringify(updatedTimeslot));
//       console.log(updatedTimeslot, "huihuihui"); // Log the updated array
//       console.log(JSON.stringify(updatedTimeslot)); // Log the updated JSON string

//       return updatedTimeslot; // Return the new state
//     });

//     // setTimedata(
//     //   JSON.stringify({
//     //     selectTimes,
//     //   })
//     // );
//     // console.log(timedata, "timedata");
//   };

//   const addTimeSlotHandler = async (e) => {
//     const { id } = params;
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("category", selectCategory);
//     formData.append("nextdate", nextdate);
//     formData.append("dateday", dateday);
//     formData.append("timeslotlist", timeslotlist);
//     // formData.append("image", image);

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateTime/${id}`,
//         formData
//       );
//       // setCity("");
//       // setStatus("")
//     } catch (error) {
//       console.log(error);
//     }

//     console.log(selectCategory);
//     console.log(nextdate);
//     console.log(dateday);
//     console.log("selected", timedata);

//     setSelectCategory("");
//     setNextdate("");
//     setDateday("");
//     setTimeslotlist("");
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCategory`
//         );
//         if (Array.isArray(response.data.category)) {
//           setCategoriesList(response.data.category);
//           // console.log(response.data.category);
//         } else {
//           console.error(
//             "Error: Expected an array but got:",
//             response.data.category
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const Status = () => {
//     return (
//       <div className="flex flex-col h-fit w-full gap-2">
//         <h4 className="ml-3 text-lg">Current or Next Date?</h4>
//         <select
//           className="p-3 border-none bg-inputBG  shadow-sm"
//           value={nextdate}
//           onChange={(e) => setNextdate(e.target.value)}
//         >
//           <option value="" className="text-gray-400">
//             Select Date Status...
//           </option>
//           <option value="Current">Current</option>
//           <option value="Next">Next</option>
//         </select>
//       </div>
//     );
//   };

//   const handleDateChange = (e) => {
//     setDateday(e.target.value);
//     // setDate(new Date(e.target.value));
//     setDate(e.target.value);
//   };
//   //   useEffect(() => {
//   //     handleCheckboxChange();
//   //   }, []);

//   return (
//     <div className="flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
//       <h1 className="py-4 px-6 text-xl w-full  border-none bg-inputBG shadow-sm">
//         Update Timeslot and Date
//       </h1>

//       <form
//         className="flex flex-col gap-8 items-start"
//         onSubmit={addTimeSlotHandler}
//         encType="multipart/form-data"
//       >
//         <div className="flex flex-col h-fit w-full gap-2">
//           <label htmlFor="category" className="ml-3 text-lg">
//             Service Category
//           </label>
//           <select
//             id="category"
//             name="category"
//             value={setSelectCategory}
//             onChange={(e) => setSelectCategory(e.target.value)}
//             className="p-3 border-none bg-inputBG shadow-sm appearance-none w-full text-gray-700"
//           >
//             <option value="">Select Service Category</option>
//             {/* Ensure categoriesList is an array before using map */}
//             {Array.isArray(categoriesList) &&
//               categoriesList.map((categoryItem) => (
//                 <option key={categoryItem._id} value={categoryItem._id}>
//                   {categoryItem.category}
//                 </option>
//               ))}
//           </select>
//         </div>

//         {/* <div className="flex flex-col h-fit w-full gap-2">
//           <h4 className="ml-3 text-lg"> Select Category</h4>
//           <input
//             name="category"
//             value={selectCategory}
//             onChange={(e) => setSelectCategory(e.target.value)} // Update category state on change
//             style={{ border: "1px solid lightgrey" }}
//             className="p-3 shadow-sm"
//             type="text"
//             placeholder="Enter Category"
//           />
//         </div> */}

//         <Status />

//         <div className="flex flex-col h-fit w-full gap-2">
//           <h4 className="ml-3 text-lg">Date-Day</h4>
//           <input
//             name="dateday"
//             value={dateday}
//             onChange={handleDateChange}
//             className="p-3 shadow-sm bg-inputBG border-none"
//             type="text"
//             placeholder="Enter Date"
//           />
//         </div>

//         <div className="flex flex-col h-fit w-full gap-2 ">
//           <h4 className="ml-3 text-lg">Timeslot List</h4>

//           <div className="grid grid-cols-5">
//             {timeslot.map((slot) => (
//               <div className="flex items-center p-1 m-1 text-center justify-center ">
//                 <div className="flex justify-center items-center outline-none">
//                   <label key={slot}>
//                     <input
//                       id="remember"
//                       aria-describedby="remember"
//                       type="checkbox"
//                       value={slot}
//                       checked={timeslots.includes(slot)}
//                       onChange={handleCheckboxChange}
//                       className="w-5 h-5 border border-gray-300 rounded bg-inputBG outline-none focus:ring-0"
//                     />
//                   </label>
//                 </div>

//                 <div className="ml-2 mt-1 text-sm">
//                   <label
//                     htmlFor="remember"
//                     className="text-gray-500 dark:text-gray-300"
//                   >
//                     {slot}
//                   </label>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* <button type="submit" className='mt-5 bg-[black] outline-none text-white py-3 px-6 text-base rounded-md'>Add Sub Category</button> */}
//         <Button props={"Update Timeslot & Date"} />
//       </form>
//     </div>
//   );
// };

// export default page;

"use client";
import Button from "@/components/Button";
import { addTimeAndSlot } from "@/store/Actions/adminActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
const Page = ({ params }) => {
  const [selectCategory, setSelectCategory] = useState("");
  const [nextdate, setNextdate] = useState("");
  const [dateday, setDateday] = useState("");
  const [timeslots, setTimeslots] = useState([]); // Holds selected timeslots
  const [categoriesList, setCategoriesList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const [errorMessage, setErrorMessage] = useState(null); // Error message for user feedback
  const [successMessage, setSuccessMessage] = useState(null); // Success message for user feedback
  const { id } = params;
  console.log(id);
  const timeslotOptions = [
    "08:00AM",
    "08:30AM",
    "09:00AM",
    "09:30AM",
    "10:00AM",
    "10:30AM",
    "11:00AM",
    "11:30AM",
    "12:00PM",
    "12:30PM",
    "01:00PM",
    "01:30PM",
    "02:00PM",
    "02:30PM",
    "03:00PM",
    "03:30PM",
    "04:00PM",
    "04:30PM",
    "05:00PM",
    "05:30PM",
    "06:00PM",
    "06:30PM",
    "07:00PM",
    "07:30PM",
    "08:00PM",
  ];
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCategory`
        );
        if (response.data?.category) {
          setCategoriesList(response.data.category);
        } else {
          console.error(
            "Error: Invalid category data received:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorMessage("Failed to load service categories.");
      }
    };
    fetchCategories();
  }, []);
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setTimeslots((prev) =>
      prev.includes(value)
        ? prev.filter((slot) => slot !== value)
        : [...prev, value]
    );
  };
  const addTimeSlotHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!selectCategory || !nextdate || !dateday || timeslots.length === 0) {
      setErrorMessage(
        "Please fill all fields and select at least one timeslot."
      );
      setIsSubmitting(false);
      return;
    }
    try {
      const payload = {
        category: selectCategory,
        nextdate,
        dateday,
        timeslotlist: timeslots,
      };
      console.log(payload);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateTime/${id}`,
        payload
      );
      console.log(response);
      setSuccessMessage("Timeslot and date added successfully!");
      setSelectCategory("");
      setNextdate("");
      setDateday("");
      setTimeslots([]);
      setTimeout(() => {
        router.push("/timeslot/list");
      }, 1500); // Redirect after a brief success message display
    } catch (error) {
      console.error("Error adding timeslot:", error);
      setErrorMessage("Failed to add timeslot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <h1 className="py-4 px-6 text-xl w-full border-none shadow-sm text-textBlack bg-headerBG">
        Add Timeslot and Date
      </h1>
      <form
        className="flex flex-col gap-8 items-start"
        onSubmit={addTimeSlotHandler}
        encType="multipart/form-data"
      >
        <div className="flex flex-col h-fit w-full gap-2">
          <label htmlFor="category" className="ml-3 text-lg text-textBlack">
            Service Category
          </label>
          <select
            id="category"
            name="category"
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
            className="p-3 border-none shadow-sm appearance-none w-full bg-inputBG"
          >
            <option value="">Select Service Category</option>
            {categoriesList.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col h-fit w-full gap-2">
          <label className="ml-3 text-lg text-textBlack">
            Current or Next Date?
          </label>
          <select
            value={nextdate}
            onChange={(e) => setNextdate(e.target.value)}
            className="p-3 border-none shadow-sm bg-inputBG"
          >
            <option value="">Select Date Status...</option>
            <option value="Current">Current</option>
            <option value="Next">Next</option>
          </select>
        </div>
        <div className="flex flex-col h-fit w-full gap-2">
          <label className="ml-3 text-lg text-textBlack">Date-Day</label>
          <input
            value={dateday}
            onChange={(e) => setDateday(e.target.value)}
            className="p-3 shadow-sm bg-inputBG border-none"
            type="text"
            placeholder="Enter Date"
          />
        </div>
        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg">Timeslot List</h4>
          <div className="grid grid-cols-5">
            {timeslotOptions.map((slot) => (
              <div
                key={slot}
                className="flex items-center p-1 m-1 text-center justify-center"
              >
                <input
                  type="checkbox"
                  value={slot}
                  checked={timeslots.includes(slot)}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 border border-gray-300 rounded bg-inputBG focus:ring-0"
                />
                <span className="ml-2 text-sm text-gray-500">{slot}</span>
              </div>
            ))}
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <Button
          props={isSubmitting ? "Adding..." : "Add Timeslot & Date"}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};
export default Page;
