import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function PrivacyPolicy() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getPrivacyPolicy`
        );
        if (response.data.success) {
          setContent(response.data.data[0].content);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, []);

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/addOrUpdatePrivacyPolicy`,
        { content }
      );
      if (response.data.success) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative bg-white p-5 h-full w-full rounded-md flex flex-col gap-3">

      <h2 className="ml-6 w-full text-left text-xl">Privacy Policy</h2>

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
          "link",
        ]}
        placeholder="Write your content here..."
        style={{
          height: "460px",
          width: "95%",
          marginTop: "10px",
          marginBottom: "50px",
          marginLeft: "20px",
        }}
      />

      <button
        className="px-6 py-3 w-fit bg-blue-600 text-white text-sm  ml-5 mt-2"
        onClick={handleSave}
      >
        Save Content
      </button>
    </div>
  );
}

export default PrivacyPolicy;
