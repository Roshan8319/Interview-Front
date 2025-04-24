import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    width: "950px", // Customize width as needed
    borderRadius: "1rem", // Adds rounded corners (equivalent to rounded-2xl)
    backgroundColor: "#F2EAE5", // Change this to your desired background color
  },
}));

function Interviewer() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [user, setUsers] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [strength, setStrength] = useState("");
  const [language, setLanguage] = useState("");
  const [experience, setExperience] = useState("");
  const [addUser, setAddUser] = useState(false);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
  });
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [items, setItems] = useState([]);

  const handleAddUserOpen = () => setAddUserOpen(true);
  const handleAddUserClose = () => setAddUserOpen(false);

  const handleEditUserOpen = (name, email, phone, experience) => {
    setEditUserOpen(true);
    setEditUser({ name, email, phone, experience });
  };
  const handleEditUserClose = () => setEditUserOpen(false);

  const handleSelection = (e) => {
    const newOption = e.target.value;
    setSelectedOption(newOption);
    if (newOption && !items.includes(newOption)) {
      setItems([...items, newOption]);
      selectedOption("");
    }
  };

  const removeItem = (ItemToRemove) => {
    console.log("hii remove clicked");

    setItems(items.filter((item) => item !== ItemToRemove));
  };

  // Search FILTER

  const [searchTerm, setSearchTerm] = useState("");

  const [clickedIndex, setClickedIndex] = useState(null);

  // const data = [
  //   { name: 'Ashok Samal', email: '123@gmail.com', phone: 1234567890, strength: "Backend", language: "Java", experience: 23 },
  //   { name: 'Sudeep', email: '234@gmail.com', phone: 1234567890, strength: "Frontend", language: "React.js", experience: 23 },
  //   { name: 'Roshan', email: '345@gmail.com', phone: 1234567890, strength: "SQL", language: "Java", experience: 23 },
  //   { name: 'Richa', email: '123@gmail.com', phone: 1234567890, strength: "SQL", language: "Java", experience: 23 },
  //   { name: 'Ruchi', email: '234@gmail.com', phone: 1234567890, strength: "SQL", language: "Java", experience: 23 },
  //   { name: 'Sam Johnson', email: '345@gmail.com', phone: 1234567890, strength: "SQL", language: "Java", experience: 23 },
  // ];

  const [selectedFilters, setSelectedFilters] = useState({
    domain: "All",
    status: "All",
  });

  const domains = ["All", "Backend", "Frontend", "DevOps", "AI/ML", "Testing"];
  const statuses = ["All", "0-4 Years", "4-8 Years", "8-10 Years", "10+ Years"];
  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = axios
      .get(`${baseUrl}/api/v1/internal/getAllInterviewers`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(response);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  });
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E65F2B]"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading Interviewer data...</p>
    </div>
  );
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EBDFD7] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 pt-4  pl-0  text-[14px] min-h-[calc(100vh-64px)] bg-[#EBDFD7]  ">
      <div className="pl-6">
        <div className=" w-full h-full flex flex-col items-center  ">
          <div className="w-full flex  pb-[12px] pr-3 justify-end space-x-4  ">
            <div className="w-[466px] h-[40px] flex justify-around items-center border-2 border-[#F4F4F4] bg-white rounded-[28px] pr-1 pl-1 ">
              <input
                className="  w-[358px] h-[37px] ml-1  text-[#979DA3] border-none focus:outline-none"
                type="text"
                placeholder="Search job by Name, Email & Mobile Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </button>
            </div>
            <div>
              <button
                className="relative w-[180px] h-10 flex items-center rounded-full border-[1px] border-[#E65F2B] overflow-hidden bg-[#ffffff] cursor-pointer transition-all duration-300 hover:bg-[#E65F2B] active:border-[#E65F2B] group"
                onClick={() => navigate(`/internal/addinterviewer`)}
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
                <span class=" pl-2 absolute left-2 text-[#E65F2B] font-semibold transition-all duration-300 group-hover:text-transparent">
                  Add Interviewer
                </span>
              </button>
            </div>
          </div>
          <div className="w-full h-[104px] grid grid-cols-[1fr_1fr_1fr_1fr_1fr]  2xl:gap-x-7 gap-x-4 justify-between items-center p-2 ">
            <div className=" flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ">
              <span className="font-normal  ">Total Interviewers</span>
              <span className="font-semibold text-[24px] ">758</span>
            </div>
            <div className=" flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ">
              <span className="font-normal  ">0-4 Years</span>
              <span className="font-semibold text-[24px] ">26</span>
            </div>
            <div className=" flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ">
              <span className="font-normal  ">4-8 Years</span>
              <span className="font-semibold text-[24px] ">56</span>
            </div>
            <div className=" flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ">
              <span className="font-normal  ">8-10 Years</span>
              <span className="font-semibold text-[24px] ">26</span>
            </div>
            <div className=" flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ">
              <span className="font-normal  ">10+ Years</span>
              <span className="font-semibold text-[24px] ">210</span>
            </div>
          </div>
          <div className=" w-full flex flex-col p-2 mt-1 mb-1 ">
            <div className="flex justify-between">
              <div className=" flex  items-center space-x-4 p-1 ">
                <div className="space-y-2">
                  {/*Strength Filter */}
                  <div className="flex font-medium items-center space-x-1">
                    <span className="flex font-bold  mr-2">Strength</span>
                    {domains.map((domain) => (
                      <button
                        key={domain}
                        onClick={() => handleSelect("domain", domain)}
                        className={`flex items-center justify-center px-2 py-1 border rounded-2xl text-[12px] w-auto ${selectedFilters.domain === domain
                          ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                          : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                          }`}
                      >
                        {/* Tick placeholder */}

                        {selectedFilters.domain === domain && (
                          <span className="w-4 flex justify-center items-center">
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
                        {domain}
                      </button>
                    ))}
                  </div>

                  {/* Experience Filter */}
                  <div className="flex items-center font-medium space-x-1">
                    <span className=" font-bold  mr-2">Experience</span>
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleSelect("status", status)}
                        className={`flex items-center justify-center px-2 py-1 border rounded-2xl text-[12px] w-auto ${selectedFilters.status === status
                          ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                          : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                          }`}
                      >
                        {/* Tick placeholder */}

                        {selectedFilters.status === status && (
                          <span className="w-4 flex justify-center">
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
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="w-[100%] bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md overflow-hidden mt-6">
            <table className="w-[100%] h-[100%]">
              <thead className="border-b-2 border-[#E65F2B]/20">
                <tr className="">
                  <th className="py-4 px-6 font-bold text-[#E65F2B]">USERS</th>
                  <th className="py-4 px-6 font-bold text-[#E65F2B]">EMAIL ID</th>
                  <th className="py-4 px-6 font-bold text-[#E65F2B]">PHONE NO</th>
                  <th className="py-4 px-6 font-bold text-[#E65F2B]">STRENGTH</th>
                  <th className="py-4 px-6 font-bold text-[#E65F2B]">LANGUAGES</th>
                  <th className="py-4 px-6 font-bold text-[#E65F2B]">EXPERIENCE</th>
                  <th className="py-4 px-6 font-bold text-[#E65F2B]"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) ? (
                  data.map((user, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors text-[#797979]`}
                    >
                      <td className="py-3 px-6 max-w-max text-center text-[#000000]">{user.firstName}</td>
                      <td className="py-3 px-6 max-w-max text-center">{user.email}</td>
                      <td className="py-3 px-6 max-w-max text-center">{user.phone}</td>
                      <td className="py-3 px-6 max-w-max text-center">
                        {user.strength}
                      </td>
                      <td className="py-3 px-6 max-w-max text-center">{ }</td>
                      <td className="py-3 px-6 max-w-max text-center">
                        {user.experience} Years
                      </td>
                      <td className="py-3 px-6 max-w-max text-center">
                        <div className="w-full flex items-center justify-between">
                          <button
                            className="hover:scale-110 hover:duration-150 p-1 rounded-full"
                            onClick={() => {
                              handleEditUserOpen(
                                user.name,
                                user.email,
                                user.phone,
                                user.experience
                              );
                            }}
                          >
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.83337 6.28562C1.83337 5.10481 2.30245 3.97237 3.13741 3.13741C3.97237 2.30245 5.10481 1.83337 6.28562 1.83337H11C11.2432 1.83337 11.4763 1.92995 11.6482 2.10186C11.8201 2.27377 11.9167 2.50693 11.9167 2.75004C11.9167 2.99316 11.8201 3.22631 11.6482 3.39822C11.4763 3.57013 11.2432 3.66671 11 3.66671H6.28562C5.59104 3.66671 4.92491 3.94263 4.43377 4.43377C3.94263 4.92491 3.66671 5.59104 3.66671 6.28562V15.7145C3.66671 16.409 3.94263 17.0752 4.43377 17.5663C4.92491 18.0575 5.59104 18.3334 6.28562 18.3334H15.7145C16.409 18.3334 17.0752 18.0575 17.5663 17.5663C18.0575 17.0752 18.3334 16.409 18.3334 15.7145V11C18.3334 10.7569 18.43 10.5238 18.6019 10.3519C18.7738 10.18 19.0069 10.0834 19.25 10.0834C19.4932 10.0834 19.7263 10.18 19.8982 10.3519C20.0701 10.5238 20.1667 10.7569 20.1667 11V15.7145C20.1667 16.8953 19.6976 18.0277 18.8627 18.8627C18.0277 19.6976 16.8953 20.1667 15.7145 20.1667H6.28562C5.10481 20.1667 3.97237 19.6976 3.13741 18.8627C2.30245 18.0277 1.83337 16.8953 1.83337 15.7145V6.28562Z" fill="black" />
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8756 12.1175L11.8543 13.3367L10.9074 11.7664L12.9287 10.5472L12.9314 10.5454C13.0089 10.4987 13.0803 10.4427 13.1441 10.3786L17.7366 5.76224C17.7826 5.71586 17.8269 5.66786 17.8695 5.61832C18.1729 5.26449 18.6221 4.56416 18.0785 4.01782C17.6192 3.55582 16.9611 3.99216 16.5348 4.36707C16.4205 4.46787 16.3104 4.57338 16.2048 4.68332L16.1737 4.71449L11.6453 9.26574C11.5378 9.37262 11.4535 9.50058 11.3978 9.64157L10.6425 11.5418C10.6282 11.5776 10.6255 11.6169 10.6348 11.6543C10.6441 11.6917 10.6649 11.7252 10.6944 11.75C10.7238 11.7749 10.7603 11.7899 10.7987 11.7928C10.8371 11.7957 10.8745 11.7865 10.9074 11.7664L11.8543 13.3367C10.1997 14.334 8.22433 12.6583 8.93933 10.8635L9.69558 8.96416C9.84282 8.593 10.0643 8.25581 10.3464 7.97324L14.8738 3.42107L14.9004 3.39449C15.0352 3.25699 15.488 2.79316 16.0371 2.45949C16.3368 2.27891 16.8153 2.03966 17.4066 1.99382C18.0849 1.93974 18.8091 2.15332 19.3774 2.72441C19.8124 3.15413 20.086 3.72068 20.152 4.32857C20.1974 4.80239 20.125 5.28009 19.9412 5.71916C19.6753 6.37641 19.2317 6.85949 19.0364 7.05474L14.4439 11.6711C14.2728 11.8428 14.0834 11.9916 13.8756 12.1175ZM17.9575 5.58532C17.9575 5.58532 17.9538 5.58807 17.9456 5.59082L17.9575 5.58532Z" fill="black" />
                            </svg>

                          </button>

                          {/* Delete button */}
                          {/* <button className="hover:scale-110 hover:duration-150 p-1 ">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.5 4.98356C14.725 4.70856 11.9333 4.56689 9.15 4.56689C7.5 4.56689 5.85 4.65023 4.2 4.81689L2.5 4.98356"
                                stroke="#ff0000"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M7.0835 4.1415L7.26683 3.04984C7.40016 2.25817 7.50016 1.6665 8.9085 1.6665H11.0918C12.5002 1.6665 12.6085 2.2915 12.7335 3.05817L12.9168 4.1415"
                                stroke="#ff0000"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15.7082 7.6167L15.1665 16.0084C15.0748 17.3167 14.9998 18.3334 12.6748 18.3334H7.32484C4.99984 18.3334 4.92484 17.3167 4.83317 16.0084L4.2915 7.6167"
                                stroke="#ff0000"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M8.6084 13.75H11.3834"
                                stroke="#ff0000"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M7.9165 10.4165H12.0832"
                                stroke="#ff0000"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button> */}

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-3 px-6 max-w-max text-center">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Edit User Dialog */}
          <BootstrapDialog
            onClose={handleEditUserClose}
            aria-labelledby="edit-user-dialog-title"
            open={editUserOpen}
            BackdropProps={{
              sx: { backgroundColor: "rgba(0, 0, 0, 0.40)" },
            }}
          >
            <DialogTitle id="edit-user-dialog-title" sx={{ m: 0, p: 2 }}>
              <h1 className="font-bold text-[#E65F2B] text-lg text-start">
                Edit User
              </h1>
              <IconButton
                aria-label="close"
                onClick={handleEditUserClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <div className="w-full flex flex-wrap gap-4 md:flex-nowrap">
                {/* Left Column */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                    <label className="w-1/4 text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={editUser.name}
                      className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]" />
                  </div>
                  <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                    <label className="w-1/4 text-sm font-medium text-[#6B6F7B]">
                      Mail ID
                    </label>
                    <input
                      type="mail"
                      placeholder="Enter your email"
                      value={editUser.email}
                      className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]" />
                  </div>
                  <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                    <label className="w-full text-sm font-medium text-[#6B6F7B]">
                      Phone Number
                    </label>
                    <input
                      placeholder="enter number"
                      value={editUser.phone}
                      className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                    <label className="w-full text-sm font-medium text-[#6B6F7B]">
                      Experience
                    </label>
                    <input
                      type="text"
                      placeholder="0-4 Years"
                      value={editUser.experience}
                      className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]" />
                  </div>
                  <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                    <label className="w-full text-sm font-medium text-[#6B6F7B] text-start">
                      Job Assigned
                    </label>
                    <select
                      onChange={handleSelection}
                      value={selectedOption}
                      className={`block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${items.length === 0 ? "text-gray-500" : "text-black"
                        } `}
                    >
                      <option value="" disabled>
                        Select Roles
                      </option>
                      <option value="EM">EM</option>
                      <option value="PM">PM</option>
                      <option value="SDE II">SDE II</option>
                      <option value="SDE III">SDE III</option>
                      <option value="DevOps I">DevOps I</option>
                      <option value="SDET I">SDET I</option>
                      <option value="SDET II">SDET II</option>
                    </select>
                  </div>

                  <div className="w-[90%] flex items-center justify-start ">
                    <div className="flex flex-wrap gap-2 mt-[-10px]">
                      <ul className="flex flex-wrap justify-start gap-2 items-center ">
                        {" "}
                        {items.map((item, index) => (
                          <li
                            key={index}
                            className="flex text-[12px] items-center py-1 px-2 inline-block border-[1px] rounded-lg outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                          >
                            {" "}
                            {item}{" "}
                            <button
                              onClick={() => removeItem(item)}
                              className="ml-2 text-red-500 text-[12px]"
                            >
                              ✕
                            </button>{" "}
                          </li>
                        ))}{" "}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleEditUserClose}
                className=" h-[40px] flex items-center gap-2 text-[#E65F2B] bg-white px-6 py-3 rounded-full text-[18px] font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md"
              >
                Save
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7179 10.8489C20.8466 10.9778 20.9189 11.1525 20.9189 11.3347C20.9189 11.5169 20.8466 11.6916 20.7179 11.8206L14.3131 18.2372C14.2497 18.3029 14.1739 18.3553 14.09 18.3914C14.0062 18.4275 13.916 18.4465 13.8247 18.4473C13.7334 18.4481 13.6429 18.4308 13.5584 18.3963C13.4739 18.3617 13.3971 18.3107 13.3325 18.2462C13.2679 18.1817 13.2168 18.1049 13.1822 18.0205C13.1476 17.936 13.1302 17.8455 13.1309 17.7542C13.1317 17.6629 13.1506 17.5727 13.1866 17.4888C13.2226 17.4049 13.2749 17.329 13.3406 17.2656L18.5729 12.0231L3.73205 12.0332C3.54972 12.0335 3.37475 11.9613 3.24565 11.8325C3.11654 11.7037 3.04388 11.529 3.04363 11.3466C3.04339 11.1643 3.11559 10.9893 3.24435 10.8602C3.37311 10.7311 3.54788 10.6585 3.73022 10.6582L18.5747 10.6491L13.3396 5.40389C13.274 5.34044 13.2217 5.26455 13.1857 5.18066C13.1497 5.09676 13.1308 5.00654 13.13 4.91525C13.1293 4.82397 13.1467 4.73345 13.1813 4.64897C13.2159 4.5645 13.267 4.48776 13.3316 4.42324C13.3962 4.35872 13.4729 4.30771 13.5575 4.27318C13.642 4.23865 13.7325 4.2213 13.8238 4.22214C13.9151 4.22297 14.0053 4.24198 14.0891 4.27805C14.173 4.31412 14.2488 4.36653 14.3122 4.43222L20.7179 10.8489Z" fill="#E65F2B" />
                </svg>
              </button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </div>
    </div>
  );
}

export { Interviewer as InternalInterviewer };
