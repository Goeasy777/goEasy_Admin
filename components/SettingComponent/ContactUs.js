import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const ContactUs = () => {
  const [recordId, setRecordId] = useState(null);
  const [content, setContent] = useState(``);
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getContactUs`
        );
        if (
          response.status === 200 &&
          response.data.success &&
          response.data.data.length > 0
        ) {
          const backendData = response.data.data[0];
          setRecordId(backendData._id);
          const formattedContent = `
            <h1 style="text-align: center;">Contact Us</h1>

            <br>

            <p style="text-align: center; font-weight: bold;">${backendData.paragraph ||
            "Our Mission is to empower millions of service professionals..."
            }</p>

            <br><br><br>

            <p style="text-align: center;">For general queries, contact us: <a href="mailto:${backendData.email || "help@goeasyservices.in"
            }">${backendData.email || "help@goeasyservices.in"}</a></p>

            <br><br>

            <p style="text-align: center;">Contact us: ${backendData.contactNo || "No contact number available"
            }</p>

            <br><br>

            <p style="text-align: center;">Address – ${backendData.address || "No address available"
            }</p>

          `;
          setContent(formattedContent);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const extractData = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const paragraphElement = Array.from(tempDiv.querySelectorAll("p")).find(
      (p) =>
        p.innerText.trim().length > 0 &&
        !p.innerText.includes("Contact us:") &&
        !p.innerText.includes("Address –")
    );
    const paragraph = paragraphElement
      ? paragraphElement.innerText.trim()
      : "No paragraph found";
    const emailElement = tempDiv.querySelector("a[href^='mailto']");
    const email = emailElement
      ? emailElement.innerText.trim()
      : "No email found";
    const contactNoElement = Array.from(tempDiv.querySelectorAll("p")).find(
      (p) => p.innerText.includes("Contact us:")
    );
    const contactNo = contactNoElement
      ? contactNoElement.innerText.match(/\d+/g)?.join("")
      : "No contact number found";
    const addressElement = Array.from(tempDiv.querySelectorAll("p")).find((p) =>
      p.innerText.includes("Address –")
    );
    const address = addressElement
      ? addressElement.innerText.replace("Address –", "").trim()
      : "No address found";
    return {
      paragraph,
      email,
      contactNo,
      address,
    };
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    const extractedData = extractData();
    try {
      if (recordId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateContactUs/${recordId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(extractedData),
          }
        );
        if (response.data.success) {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        } else {
          const errorData = await response.json();
          console.error("Failed to update content:", errorData);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      if (!recordId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/addContactUs`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(extractedData),
          }
        );
        if (response.ok) {
          console.log("Content saved successfully!");
        } else {
          console.error("Failed to save content:", await response.json());
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="bg-white p-5 h-full w-full rounded-md flex flex-col gap-3">

        <h4 className="ml-6 w-full text-left text-xl">Contact Us</h4>

        {showAlert && (
          <Alert
            className="absolute w-80 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
          >
            Update successful!
          </Alert>
        )}

        <ReactQuill
          style={{
            height: "460px",
            width: "95%",
            marginTop: "10px",
            marginBottom: "50px",
            marginLeft: "20px",
          }}
          value={content}
          onChange={handleEditorChange}
          theme="snow"
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ header: [1, 2, 3, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "align",
            "link",
          ]}
          placeholder="Write your content here..."
        />
        <button
          className="px-6 py-3 w-fit bg-blue-600 text-white text-sm  ml-5 mt-2"
          onClick={handleSubmit}
        >
          Save Content
        </button>
      </div>
    </>
  );
};
export default ContactUs;