import React, { useState } from "react";
import { RiFileWord2Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast("please Select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "https://word-to-pdf-backend-mbbz.onrender.com/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement("a");
      console.log(link);
      link.href = url;
      console.log(link);
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      console.log(link);
      document.body.appendChild(link);
      console.log(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      toast.success("File converted successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status == 400) {
        toast.error("Error occuring", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <div className="mt-3 mx-auto max-w-screen-2xl w-[600px] p-10 flex justify-center items-center shadow-2xl h-[600px]">
        <div className=" gap-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Wordf to PDF converter</h1>
          <div className="max-w-screen-2xl mx-auto container py-3 px-6 border-2 bg-indigo-50 border-dashed border-indigo-400 rounded-lg flex flex-col items-center">
            <img
              className=" h-40 w-40"
              src="https://cdn.dribbble.com/users/616823/screenshots/3120552/pdf-page-flip-animation.gif"
            ></img>
            <p className=" text-sm text-center py-8">
              Select a Microsoft Word document (DOCX or DOC) to convert to PDF
            </p>
            <div className="w-full flex flex-col items-center space-y-3">
              <input
                type="file"
                accepts=".doc, .docx"
                onChange={handleFileChange}
                className="hidden"
                id="FileInput"
              />
              <label
                htmlFor="FileInput"
                className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
              >
                <RiFileWord2Line className="text-3xl mr-3" />
                <span className="text-2xl mr-2">
                  {selectedFile ? selectedFile.name : "Choose File"}
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
              >
                Convert File
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
