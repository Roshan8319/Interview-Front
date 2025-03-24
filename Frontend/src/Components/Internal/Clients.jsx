import React from "react";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '400px', // You can customize this value to whatever you need
  },
}));




function Clients() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  

  const [logofile,setLogoFile] = useState(null);
  const handleFileChange = (event) =>{
    setLogoFile(event.target.files[0]);
    console.log('Selected File:', event.target.files[0]);
  }
  

 
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
  });


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
    setEditUser({ pocName, emailid, pocContactNumber })
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const [selectedFilters, setSelectedFilters] = useState({
    domain: "All",
    status: "All",
  });

  const domains = ["All", "Domain 1", "Domain 2", "Domain 3", "Domain 4", "Domain 5"];
  const statuses = ["All", "Active", "Inactive"];

  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const [addPocDate, setAddPocDate] = useState("")

  const addPocHandleDateChange = (e) => {
    setAddPocDate(e.target.value)
  }


  const [formData, setFormData] = useState({companyName:"", companywebsite:"", email:"", password:"", confirmPassword:"", gstin:"", industry:"", interviewAmount:"", address:"", companyLogo:"", pocName:"", pocContactNumber:"", pocEmail:""})

  const handleChange =(e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
  }



  







  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submission initiated");
  
      const clientData = new FormData();
      if (logofile) {
        clientData.append('companyLogo', logofile);
      }
      Object.keys(formData).forEach((key) => {
        clientData.append(key, formData[key]);
      });
  
      const response = await axios.post(`${baseUrl}/api/v1/internal/add-client`, clientData, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      console.log('Response:', response);
      console.log('Client added successfully');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    
    const response = axios.get(`${baseUrl}/api/v1/internal/getAllClients`,{
      withCredentials: true, 
    })
    .then(res => {
      console.log(res);
      
      setData(res.data.data);
      setLoading(false);
    })
    .catch(error =>{
      console.error('Error fetching data',error);
      setLoading(false)
    })
  },[])


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
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
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
              {/* Domain Filter */}
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold mr-2 flex">Domain</span>
                {domains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => handleSelect("domain", domain)}
                    className={`flex items-center justify-center px-2 py-1 border rounded-md text-xs w-auto ${selectedFilters.domain === domain
                      ? "bg-purple-100 text-purple-700 border-purple-300"
                      : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    {/* Tick container */}
                    {selectedFilters.domain === domain && (
                      <span className="w-4 h-4 flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 text-purple-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    {domain}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold mr-4">Status</span>
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleSelect("status", status)}
                    className={`flex items-center justify-center px-2 py-1 border rounded-md text-xs w-auto ${selectedFilters.status === status
                      ? "bg-purple-100 text-purple-700 border-purple-300"
                      : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    {/* Tick container */}

                    {selectedFilters.status === status && (
                      <span className="w-4 h-4 flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 text-purple-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}

                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm text-left text-gray-500 border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4 whitespace-nowrap">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
                      Active Jobs
                    </th>
                    {/* <th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
                      Passive Jobs
                    </th> */}
                    <th scope="col" className="px-6 py-4 whitespace-nowrap text-center">
                      Total Candidates
                    </th>
                  </tr>
                </thead>
                <tbody>
               
                  
                  {Array.isArray(data) ? (
                    data.map((client, index) => (
                      <tr key={client.id} className="border-b border-[#f0ad4e]">
                        <td className="px-6 py-4 text-blue-600 font-bold">
                          {client.companyName}
                        </td>
                        <td className="px-6 py-4 text-center">{client.totalJobs}</td>
                        {/* Uncomment below if needed */}
                        {/* <td className="px-6 py-4 text-center">{client.passiveJobs}</td> */}
                        <td className="px-6 py-4 text-center">{client.totalCandidates}</td>
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
                    <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">Client Registered Name</label>
                    <input
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter Client Name"
                      required
                      className="block w-[360px] h-[32px] border text-left border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                  <li className="flex items-center">
                    <label class="text-sm font-medium text-right w-[30%] text-gray-700 px-4">Client Website</label>
                    <input
                      type="text"
                      name="companywebsite"
                      value={formData.companywebsite}
                      onChange={handleChange}
                      placeholder="Enter Web Address"
                      required
                      className="block  w-[360px] h-[32px] border text-left border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                  <li className="flex items-center">
                    <label class="text-sm font-medium text-right  text-gray-700 w-[30%] px-4">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter Client Email"
                      className="block  w-[360px] h-[32px] text-left border border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                  <li className="flex items-center">
                    <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                      className="block w-[360px] h-[32px] text-left border border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                  <li className="flex items-center">
                    <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      required
                      className="block w-[360px] h-[32px] text-left border border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                  <li className="flex items-center">
                    <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">GSTIN</label>
                    <input
                      type="text"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleChange}
                      placeholder="Enter GSTIN "
                      className="block w-[360px] h-[32px] text-left border border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                  
                  
                  <li className="flex items-center">
                    <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">Interview Amount</label>
                    <input
                      type="number"
                      name="interviewAmount"
                      value={formData.interviewAmount}
                      onChange={handleChange}
                      placeholder="Enter Amount"
                      required
                      className="block  w-[360px] h-[32px] border text-left border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                 
                </ul>
                <ul className=" flex flex-col gap-y-2 " >
                  <li className="flex items-center">
                    <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="Enter Industry"
                      required
                      className="block  w-[360px] h-[32px] border text-left border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                  <li className="flex items-center">
                    <label class="text-sm font-medium text-right text-gray-700 w-[30%] px-4">Address</label>
                    <textarea
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Add Address"
                      className="block  w-[360px] h-[114px] border border-gray-300 rounded-lg shadow-sm  sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </li>
                  <li className="flex items-center" >
                  <label htmlFor=" " className="text-sm font-medium text-right text-gray-700 w-[30%] px-4" > Company Logo </label>

                    <div class="w-[360px] h-[104px] flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-all">
                      <label for="fileInput" class="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.4398 8.8999C20.0398 9.2099 21.5098 11.0599 21.5098 15.1099L21.5098 15.2399C21.5098 19.7099 19.7198 21.4999 15.2498 21.4999L8.72976 21.4999C4.25976 21.4999 2.46976 19.7099 2.46976 15.2399L2.46976 15.1099C2.46976 11.0899 3.91976 9.2399 7.45976 8.9099" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M12 15.0001L12 3.62012" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M15.3496 5.85L11.9996 2.5L8.64961 5.85" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <span class="text-sm">Upload Company Logo</span>
                      </label>
                      <input id="fileInput" type="file" name="companyLogo" value={formData.companyLogo}
                      onChange={handleFileChange} class="hidden" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-md w-full mt-6">
              <div className="flex items-center gap-x-5 mb-4">
                <div class="relative group inline-block">
                  {/* Always visible text */}
                  <h2 class="text-lg font-semibold text-black">POINT OF CONTACT</h2>

                  {/* Tooltip */}
                  <div
                    class="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                  >
                    Point of Contact
                  </div>
                </div>

               

































              </div>

              {/* Rows */}
              <div className="space-y-4">
                {rows.map((row, index) => (
                  <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4">
                    <div className="p-2 flex items-center justify-center gap-3">
                      <label className="text-base font-medium text-gray-600">Name: </label>
                      <input
                        type="text"
                        name="pocName"
                        value={formData.pocName}
                        onChange={handleChange}
                        placeholder="Enter POC Name"
                        className="w-full p-2 border text-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="p-2 flex items-center justify-center gap-3">
                      <label className="text-base font-medium text-gray-600">Email:</label>
                      <input
                        type="email"
                        name="pocEmail"
                        value={formData.pocEmail}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="w-full p-2 border text-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="p-2 flex items-center justify-center gap-3">
                      <label className="text-base font-medium text-gray-600">Mobile:</label>
                      <input
                        type="number"
                        name="pocContactNumber"
                        value={formData.pocContactNumber}
                        onChange={handleChange}
                        placeholder="Enter Number"
                        className="w-full p-2 border text-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-1 flex items-center space-x-2">

                    
                     
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button type="submit" onClick={handleSubmit} className="px-6 py-2 border-[3px] p-2  rounded-full text-[#f0ad4e] bg-[#000000] border-[#f0ad4e] font-medium">
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
