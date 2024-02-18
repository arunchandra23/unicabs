// import './App.css'
import Home from "./pages/Home";
import React, { useState } from "react";
import { DatePicker, TimePicker, notification } from "antd";
import backgroundImage from "./assets/back.png";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { App as App_, Spin } from "antd";
import Footer from "./components/Footer";

function App() {
  const [api, contextHolder] = notification.useNotification();
  const [typeText, setTypeText] = useState(
    "Request the entire car for yourself, whether you need a 4-seater or a 4+ seater."
  );
  const { message } = App_.useApp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pickupDate: "",
    pickupTime: "",
    fromLocation: "",
    toLocation: "",
    type: "uniGo",
    passengerCount: 1,
    comments: "",
  });

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current < dayjs().startOf("day");
  };
  const handleChange = (e) => {
    console.log(formData);
    const { id, value } = e.target;
    if (id === "uniShare" || id === "uniGo") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        type: value,
      }));
      setTypeText(
        id === "uniGo"
          ? "Request the entire car for yourself, whether you need a 4-seater or a 4+ seater."
          : "Share the ride with others - choose and request a One/Two seat for your journey."
      );
    } else if (
      id === "passengerCount" &&
      formData.type === "UniShare" &&
      value > 2
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        passengerCount: 2,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  const handleTimeChange = (time, timeString) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pickupTime: timeString,
    }));
  };
  const handleDateChange = (date, dateString) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pickupDate: dateString,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/submitRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        console.log("Data successfully submitted to the API");
        api.success({
          message: "Success!",
          description:
            "Request submitted successfully. We will get back to you soon!",
        });
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: "",
          mobileNumber: "",
          fromLocation: "",
          toLocation: "",
          type: "uniGo",
          passengerCount: 1,
          comments: "",
        }));
      } else {
        // Handle error, maybe show an error message
        api.error({
          message: "Failed!",
          description: "Something went wrong. Please try again later.",
        });
        console.error("Failed to submit data to the API");
      }
    } catch (error) {
      api.error({
        message: "Failed!",
        description: "Something went wrong. Please try again later.",
      });
      message.error("Failed to submit data to the API");
      console.error("Error while submitting data to the API", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Spin spinning={loading} size="large">
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
          <marquee className="text-white text-center fixed top-0 left-0 right-0 p-2 bg-black">
            If need further assistance please contact us at: +91-9985799009 |
            +91-9010741899
          </marquee>

          <div className="w-full md:max-w-md lg:max-w-2xl xl:max-w-4xl ">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              <img
                src={backgroundImage}
                alt="Logo"
                className="w-40 col-span-full mx-auto mb-4"
              />
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mobileNumber"
                >
                  Mobile Number
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mobileNumber"
                  type="tel"
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  value={formData.mobileNumber}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="pickupDate"
                >
                  Pickup Date
                </label>
                {/* <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pickupDate"
              type="date"
              placeholder="Pickup Date"
              onChange={handleChange}
              value={formData.pickupDate}
            /> */}
                <DatePicker
                  onChange={handleDateChange}
                  disabledDate={disabledDate}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="pickupTime"
                >
                  Pickup Time
                </label>
                <TimePicker
                  required
                  id="pickupTime"
                  format="h:mm a"
                  use12Hours
                  onChange={handleTimeChange}
                  style={{ width: "100%" }}
                  placeholder="Select time"
                  needConfirm={false}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fromLocation"
                >
                  From Location
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fromLocation"
                  type="text"
                  placeholder="From Location"
                  onChange={handleChange}
                  value={formData.fromLocation}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="toLocation"
                >
                  To Location
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="toLocation"
                  type="text"
                  placeholder="To Location"
                  onChange={handleChange}
                  value={formData.toLocation}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="type"
                >
                  Type
                </label>
                <div className="flex items-center">
                  <input
                    defaultChecked
                    className="mr-2 leading-tight"
                    type="radio"
                    name="type"
                    id="uniGo"
                    value="UniGo"
                    onChange={handleChange}
                  />
                  <label className="text-sm text-gray-700" htmlFor="uniGo">
                    UniGo
                  </label>
                  <input
                    className="ml-4 mr-2 leading-tight"
                    type="radio"
                    name="type"
                    id="uniShare"
                    value="UniShare"
                    onChange={handleChange}
                  />
                  <label className="text-sm text-gray-700" htmlFor="uniShare">
                    UniShare
                  </label>
                </div>
                {typeText && (
                  <p className="text-sm text-gray-500 mt-2">{typeText}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="passengerCount"
                >
                  Number of Passengers
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="passengerCount"
                  type="number"
                  value={formData.passengerCount}
                  placeholder="Number of Passengers"
                  onChange={handleChange}
                  min={1}
                  max={formData.type === "UniShare" ? 2 : 10}
                />
              </div>
              <div className="mb-4 col-span-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="comments"
                >
                  Comments
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="comments"
                  placeholder="Enter your comments"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Request Ride
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </Spin>
    </>
  );
}

export default App;
