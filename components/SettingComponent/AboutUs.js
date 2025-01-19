import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import dynamic from "next/dynamic";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


function AboutUs() {
  const [content, setContent] = useState(``);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getAboutUs`
        );
        setContent(response.data?.data[0]?.content || "");
      } catch (error) {
        console.error("Error fetching content:", error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateAboutUs`, { content });
      if (response.data.success) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      console.error("Error updating content:", error);
    }

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative bg-white p-5 h-full w-full rounded-md flex flex-col gap-3">

        <h2 className="ml-6 w-full text-left text-xl">About Us</h2>

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
          value={content}
          onChange={handleEditorChange}
          theme="snow"
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ header: [1, 2, false] }],
              [{ size: [] }],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
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
            "color",
            "background",
            "size",
          ]}
          placeholder="Write your content here..."
          style={{
            height: "480px",
            width: "95%",
            marginTop: "10px",
            marginBottom: "50px",
            marginLeft: "20px",
            justifyContent: "center",
          }}
        />

        <button
          className="px-6 py-3 w-fit bg-blue-600 text-white text-sm  ml-5 mt-2 "
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

export default AboutUs;
