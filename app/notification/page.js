'use client'
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import OneSignal from "react-onesignal";



const Notifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initOneSignal = async () => {
      try {
        await OneSignal.init({
          appId: `23711fc7-5237-449d-9cc2-7eff88049a37`, // Replace with your OneSignal App ID
          allowLocalhostAsSecureOrigin: true,
        });
        OneSignal.showSlidedownPrompt(); // Prompt the user to subscribe to notifications
      } catch (error) {
        console.error("OneSignal Initialization Error:", error);
      }
    };
    initOneSignal();
  }, []);

  const sendNotification = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/sendnotification`, {
        title,
        message,
      });
      if (response.data.success) {
        alert("Notification sent successfully!");
        setTitle("");
        setMessage("");
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("An error occurred while sending the notification.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Send Push Notification</h1>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", margin: "10px 0" }}
          />
        </label>
      </div>
      <div>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", height: "100px", margin: "10px 0" }}
          />
        </label>
      </div>
      <button onClick={sendNotification} style={{ padding: "10px 20px" }}>
        Send Notification
      </button>
    </div>
  );
};

export default Notifications;
