import React from "react";
import { useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "400px", // You can customize this value to whatever you need
  },
}));

function Clients() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [rows, setRows] = useState([{ name: "", email: "", mobile: "" }]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current Route:", location.pathname);
  }, [location.pathname]);

  const [addPocOpen, setAddPocOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const handleAddPocOpen = () => {
    setAddPocOpen(true);
  };

  const handleAddPocClose = () => {
    setAddPocOpen(false);
  };

  const handleEditOpen = (name, email, phone) => {
    setEditUser({ pocName, emailid, pocContactNumber });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const [selectedFilters, setSelectedFilters] = useState({
    domain: "All",
    status: "All",
  });

  const statuses = ["All", "Active", "Inactive"];

  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const [formData, setFormData] = useState({
    companyName: "",
    companywebsite: "",
    email: "",
    password: "",
    confirmPassword: "",
    gstin: "",
    industry: "",
    interviewAmount: "",
    address: "",
    companyLogo: "",
    pocName: "",
    pocContactNumber: "",
    pocEmail: "",
  });

  const [logofile, setLogofile] = useState(null); // Add state for the logo file

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024;
      if (validTypes.includes(file.type) && file.size <= maxSize) {
        setLogofile(file);
        setFormData((prevData) => ({
          ...prevData,
          companyLogo: file,
        }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image (JPEG, PNG, GIF) under 5MB");
    }
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submission initiated");

      const clientData = new FormData();
      Object.keys(formData).forEach((key) => {
        if(key !== 'companyLogo'){
        clientData.append(key, formData[key]);
        }
      });
      if (logofile) {
        console.log("Appending file:", logofile.name); // Debug log for file
        clientData.append("companyLogo", logofile); // Append the logo file
      } else {
        console.warn("No file selected for upload"); // Warn if no file is selected
      }

      

      const response = await axios.post(
        `${baseUrl}/api/v1/internal/add-client`,
        clientData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      console.log("Client added successfully");
    } catch (error) {
      console.error("Error during form submission:", error.response?.data || error.message);
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = axios
      .get(`${baseUrl}/api/v1/internal/getAllClients`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);

        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  

  const clearImage = () => {
    setPreviewImage(null);
    setLogofile(null); 
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };


  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-6 ">
      <div>
        {location.pathname === "/internal/clients" && (
          <div>
            {/* Search and Add Client Section */}
            <div className="flex flex-col justify-end sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 ml-auto">
              {/* Search Input */}
              <div className="flex items-center bg-white rounded-full px-4 py-2 w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search Client by name"
                  className="flex-1 bg-transparent text-gray-600 outline-none text-sm"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </div>

              {/* Add Client Button */}
              <button
                className="relative w-[160px] h-10 flex items-center rounded-full border-[1px] border-[#E65F2B] overflow-hidden bg-[#ffffff] cursor-pointer transition-all duration-300 hover:bg-[#E65F2B] active:border-[#E65F2B] group"
                onClick={() => navigate(`${location.pathname}/addclient`)}
              >
                <span class="absolute right-0 h-full w-[39px] bg-[#cd4b18] flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:translate-x-0 active:bg-green-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="none"
                    class="stroke-white"
                  >
                    <line y2="19" y1="5" x2="12" x1="12"></line>
                    <line y2="12" y1="12" x2="19" x1="5"></line>
                  </svg>
                </span>
                <span class=" pl-2 absolute left-4 text-[#E65F2B] font-semibold transition-all duration-300 group-hover:text-transparent">
                  Add Client
                </span>
              </button>
            </div>
            {/* Domain and Status Filters */}
            <div className="space-y-2 mt-1">
              {/* Status Filter */}
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold mr-4">Status</span>
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleSelect("status", status)}
                    className={`flex items-center justify-center px-2 py-1 border rounded-md text-[12px] w-auto ${
                      selectedFilters.status === status
                        ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                        : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                    }`}
                  >
                    {/* Tick container */}

                    {selectedFilters.status === status && (
                      <span className="w-4 h-4 flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-white-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                    &nbsp;
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm text-left text-gray-500 border-collapse">
                <thead className=" text-gray-700 uppercase font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4 whitespace-nowrap">
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 whitespace-nowrap text-center"
                    >
                      Active Jobs
                    </th>
                    {/* <th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
                      Passive Jobs
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-4 whitespace-nowrap text-center"
                    >
                      Total Candidates
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) ? (
                    data.map((client, index) => (
                      <tr key={client.id} className="border-b border-[#f0ad4e]">
                        <td className="px-6 py-4 text-[#E65F2B] font-bold">
                          {client.companyName}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {client.totalJobs}
                        </td>
                        {/* Uncomment below if needed */}
                        {/* <td className="px-6 py-4 text-center">{client.passiveJobs}</td> */}
                        <td className="px-6 py-4 text-center">
                          {client.totalCandidates}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Client Section */}
      <form action="">
        <div>
          {location.pathname === "/internal/clients/addclient" && (
            <div>
              <div>
                <div class=" flex flex-row ">
                  <ul className="flex w-[55%]  flex-col gap-y-2">
                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">
                        Client Registered Name
                      </label>
                      <input
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter Client Name"
                        required
                        className="block w-[360px] h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>
                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right w-[30%] text-gray-700 px-4">
                        Client Website
                      </label>
                      <input
                        type="text"
                        name="companywebsite"
                        value={formData.companywebsite}
                        onChange={handleChange}
                        placeholder="Enter Web Address"
                        required
                        className="block w-[360px] h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>
                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right  text-gray-700 w-[30%] px-4">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter Client Email"
                        className="block w-[360px] h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>
                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                        className="block w-[360px] h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>
                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        className="block w-[360px] h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>
                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">
                        GSTIN
                      </label>
                      <input
                        type="text"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        placeholder="Enter GSTIN "
                        className="block w-[360px] h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>

                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">
                        Interview Amount
                      </label>
                      <input
                        type="number"
                        name="interviewAmount"
                        value={formData.interviewAmount}
                        onChange={handleChange}
                        placeholder="Enter Amount"
                        required
                        className="block w-[360px] h-[32px] border text-left bg-[#F6F1EE] border-gray-100rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>
                  </ul>
                  <ul className=" flex flex-col gap-y-2 ">
                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">
                        Industry
                      </label>
                      <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="Enter Industry"
                        required
                        className="block w-[360px] h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>
                    <li className="flex items-center">
                      <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">
                        Address
                      </label>
                      <textarea
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Add Address"
                        className="block  w-[360px] h-[114px] border bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                      />
                    </li>
                    <li className="flex items-center">
                      <div className="flex items-center space-x-4 w-full max-w-2xl">
                        <label
                          htmlFor="logoUpload"
                          className="text-sm font-medium text-gray-700 w-32 text-right pr-4"
                        >
                          Company Logo
                        </label>

                        <div className="flex-grow relative">
                          <input
                            id="logoUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />

                          <div
                            className={`
            w-[360px] h-40 border-2 border-dashed rounded-lg flex items-center justify-center 
            transition-all duration-300 ease-in-out bg-[#F6F1EE] border-gray-100
            ${
              previewImage
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-[#e65f2b] hover:bg-[#fadfd5]"
            }
          `}
                          >
                            {previewImage ? (
                              <div className="relative w-full h-full flex items-center justify-center p-4">
                                <img
                                  src={previewImage}
                                  alt="Company Logo"
                                  className="max-w-full max-h-full object-contain rounded-md"
                                />
                                <button
                                  onClick={clearImage}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 
                           flex items-center justify-center hover:bg-red-600 
                           transition-colors duration-300"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <label
                                htmlFor="logoUpload"
                                className="flex flex-col items-center justify-center cursor-pointer 
                         text-gray-500 hover:text-[#e65f2b] transition-colors"
                              >
                                <ImagePlus className="w-12 h-12 mb-2" />
                                <span className="text-sm font-medium">
                                  Click to upload company logo
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                  PNG, JPG, or SVG (max 5MB)
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-md w-full mt-6">
                <div className="flex items-center gap-x-5 mb-4">
                  <div class="relative group inline-block">
                    {/* Always visible text */}
                    <h2 class="text-lg font-semibold text-black">
                      POINT OF CONTACT
                    </h2>

                    {/* Tooltip */}
                    <div class="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Point of Contact
                    </div>
                  </div>
                </div>

                {/* Rows */}
                <div className="space-y-4">
                  {rows.map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4"
                    >
                      <div className="p-2 flex items-center justify-center gap-3">
                        <label className="text-base font-medium text-gray-600">
                          Name:{" "}
                        </label>
                        <input
                          type="text"
                          name="pocName"
                          value={formData.pocName}
                          onChange={handleChange}
                          placeholder="Enter POC Name"
                          className="w-full p-2 border text-center border-gray-100 bg-[#F6F1EE] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                        />
                      </div>
                      <div className="p-2 flex items-center justify-center gap-3">
                        <label className="text-base font-medium text-gray-600">
                          Email:
                        </label>
                        <input
                          type="email"
                          name="pocEmail"
                          value={formData.pocEmail}
                          onChange={handleChange}
                          placeholder="Enter Email"
                          className="w-full p-2 border text-center border-gray-100 bg-[#F6F1EE] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                        />
                      </div>
                      <div className="p-2 flex items-center justify-center gap-3">
                        <label className="text-base font-medium text-gray-600">
                          Mobile:
                        </label>
                        <input
                          type="number"
                          name="pocContactNumber"
                          value={formData.pocContactNumber}
                          onChange={handleChange}
                          placeholder="Enter Number"
                          className="w-full p-2 border text-center border-gray-100 bg-[#F6F1EE] rounded-md focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                        />
                      </div>
                      <div className="col-span-1 flex items-center space-x-2"></div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-2 border-[3px] p-2  rounded-full font-medium text-white bg-[#E65F2B]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export { Clients as InternalClients };
