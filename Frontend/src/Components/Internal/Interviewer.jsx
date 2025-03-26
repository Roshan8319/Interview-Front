import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '515px', // Customize width as needed
  },
}));

function Interviewer() {

  const baseUrl = import.meta.env.VITE_BASE_URL

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


  const [selectedOption, setSelectedOption] = useState('');
  const [items, setItems] = useState([]);

  const handleAddUserOpen = () => setAddUserOpen(true);
  const handleAddUserClose = () => setAddUserOpen(false);

  const handleEditUserOpen = (name, email, phone, experience) => {
    setEditUserOpen(true)
    setEditUser({ name, email, phone, experience })
  };
  const handleEditUserClose = () => setEditUserOpen(false);



  const handleSelection = (e) => {
    const newOption = e.target.value;
    setSelectedOption(newOption);
    if (newOption && !items.includes(newOption)) {
      setItems([...items, newOption]);
      selectedOption("");
    }
  }

  const removeItem = (ItemToRemove) => {
    console.log("hii remove clicked");

    setItems(items.filter(item => item !== ItemToRemove))
  }

 


  // Search FILTER 

  const [searchTerm, setSearchTerm] = useState('');



  const [clickedIndex, setClickedIndex] = useState(null)

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
  const statuses = ["All", "0-4 Years", "4-8 Years", "8-10 Years", "10+ Years" ];
  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const response = axios.get(`${baseUrl}/api/v1/internal/getAllInterviewers`,{
      withCredentials:true,
    })
    .then(res=>{
      console.log(response);
      setData(res.data.data)
    })
    .catch(error =>{
      console.log(error);
      setLoading(false);
    })
  })
  

  return (
    <div className='p-6 pt-4  pl-0  text-[14px] min-h-[calc(100vh-64px)] bg-[#EBDFD7]  ' >
      <div className='pl-6' >
        <div className=' w-full h-full flex flex-col items-center  ' >
          <div className='w-full flex  pb-[12px] pr-3 justify-end space-x-4  ' >
            <div className='w-[466px] h-[40px] flex justify-around items-center border-2 border-[#F4F4F4] bg-white rounded-[28px] pr-1 pl-1 ' >
              <input
                className='  w-[358px] h-[37px] ml-1  text-[#979DA3] border-none focus:outline-none' type="text"
                placeholder='Search job by Name, Email & Mobile Number'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
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
                <span class=" pl-2 absolute left-4 text-[#E65F2B] font-semibold transition-all duration-300 group-hover:text-transparent">
                  Add Interviewer
                </span>
              </button>
            </div>

            
          </div>
          <div className='w-full h-[104px] grid grid-cols-[1fr_1fr_1fr_1fr_1fr]  2xl:gap-x-7 gap-x-4 justify-between items-center p-2 ' >
            <div className=' flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ' >
              <span className='font-normal  ' >Total Interviewers</span>
              <span className='font-semibold text-[24px] ' >758</span>
            </div>
            <div className=' flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ' >
              <span className='font-normal  ' >0-4 Years</span>
              <span className='font-semibold text-[24px] ' >26</span>
            </div>
            <div className=' flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ' >
              <span className='font-normal  ' >4-8 Years</span>
              <span className='font-semibold text-[24px] ' >56</span>
            </div>
            <div className=' flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ' >
              <span className='font-normal  ' >8-10 Years</span>
              <span className='font-semibold text-[24px] ' >26</span>
            </div>
            <div className=' flex flex-col  justify-center items-start p-4 pl-[15%] bg-[#ffffff57] shadow rounded-[16px] ' >
              <span className='font-normal  ' >10+ Years</span>
              <span className='font-semibold text-[24px] ' >210</span>
            </div>
          </div>
          <div className=' w-full flex flex-col p-2 mt-1 mb-1 ' >
            <div className='flex justify-between' >
              <div className=" flex  items-center space-x-4 p-1 ">
                
                <div className="space-y-2">
              {/*Strength Filter */}
              <div className="flex font-medium items-center space-x-1">
                <span className="flex font-bold  mr-2">Strength</span>
                {domains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => handleSelect("domain", domain)}
                    className={`flex items-center justify-center px-2 py-1 border rounded-md text-[12px] w-auto ${selectedFilters.domain === domain
                        ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                    : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                      }`}
                  >
                    {/* Tick placeholder */}
                    
                      {selectedFilters.domain === domain && (
                        <span className="w-4 flex justify-center items-center">
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

              {/* Experience Filter */}
              <div className="flex items-center font-medium space-x-1">
                <span className=" font-bold  mr-2">Experience</span>
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleSelect("status", status)}
                    className={`flex items-center justify-center px-2 py-1 border rounded-md text-[12px] w-auto ${selectedFilters.status === status
                        ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                    : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                      }`}
                  >
                    {/* Tick placeholder */}
                    
                      {selectedFilters.status === status && (
                        <span className="w-4 flex justify-center">
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
              </div>
             
            </div>
            
          </div>



      {/* User Table */}
      <div className="w-full mt-5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#f0ad4e]  text-sm font-semibold text-[#2B313E]">
              <th className="py-2 px-4">USERS</th>
              <th className="py-2 px-4">EMAIL ID</th>
              <th className="py-2 px-4">PHONE NO</th>
              <th className="py-2 px-4">STRENGTH</th>
              <th className="py-2 px-4">LANGUAGES</th>
              <th className="py-2 px-4">EXPERIENCE</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) ? (
                 data.map((user, index) => (
                  <tr
                    key={index}
                    className={` bg-[#F1E5E1] h-[80px] border-b-2 border-[#f0ad4e]  `}
                  >
                    <td className="py-3 px-4 font-semibold text-[#E65F2B] text-sm">{user.firstName}</td>
                    <td className="py-3 px-4 text-[#797979]">{user.email}</td>
                    <td className="py-3 px-4 text-[#797979]">{user.phone}</td>
                    <td className="py-3 px-4 text-[#797979]">{user.strength}</td>
                    <td className="py-3 px-4 text-[#797979]">{}</td>
                    <td className="py-3 px-4 text-[#797979]">{user.experience} Years</td>
                    <td className="py-3 px-4">
                      <div className='w-full flex items-center justify-between'>
    
    
                        <button
                          className="hover:scale-110 hover:duration-150 p-1 border-[3px] rounded-full border-[#f0ad4e] bg-[#000000] "
                          onClick={() => { handleEditUserOpen(user.name, user.email, user.phone, user.experience ) }}
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.1665 1.6665H7.49984C3.33317 1.6665 1.6665 3.33317 1.6665 7.49984V12.4998C1.6665 16.6665 3.33317 18.3332 7.49984 18.3332H12.4998C16.6665 18.3332 18.3332 16.6665 18.3332 12.4998V10.8332" stroke="#f0ad4e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M13.3666 2.51688L6.7999 9.08354C6.5499 9.33354 6.2999 9.82521 6.2499 10.1835L5.89157 12.6919C5.75823 13.6002 6.3999 14.2335 7.30823 14.1085L9.81657 13.7502C10.1666 13.7002 10.6582 13.4502 10.9166 13.2002L17.4832 6.63354C18.6166 5.50021 19.1499 4.18354 17.4832 2.51688C15.8166 0.850211 14.4999 1.38354 13.3666 2.51688Z" stroke="#f0ad4e" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.4248 3.4585C12.9831 5.45016 14.5415 7.0085 16.5415 7.57516" stroke="#f0ad4e" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
    
                        </button>
    
                        <button className='hover:scale-110 hover:duration-150 p-1 '>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 4.98356C14.725 4.70856 11.9333 4.56689 9.15 4.56689C7.5 4.56689 5.85 4.65023 4.2 4.81689L2.5 4.98356" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.0835 4.1415L7.26683 3.04984C7.40016 2.25817 7.50016 1.6665 8.9085 1.6665H11.0918C12.5002 1.6665 12.6085 2.2915 12.7335 3.05817L12.9168 4.1415" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.7082 7.6167L15.1665 16.0084C15.0748 17.3167 14.9998 18.3334 12.6748 18.3334H7.32484C4.99984 18.3334 4.92484 17.3167 4.83317 16.0084L4.2915 7.6167" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.6084 13.75H11.3834" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.9165 10.4165H12.0832" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
    
                        </button>
                      </div>
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

      {/* Edit User Dialog */}
      <BootstrapDialog
        onClose={handleEditUserClose}
        aria-labelledby="edit-user-dialog-title"
        open={editUserOpen}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
        }}
      >
        <DialogTitle id="edit-user-dialog-title" sx={{ m: 0, p: 2 }}>
          <h1 className="font-bold text-[#056DDC] text-lg text-center">EDIT USER</h1>
          <IconButton
            aria-label="close"
            onClick={handleEditUserClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
        <div className=" w-full flex-col flex items-center justify-center custom_lg:gap-2 md:gap-y-0 ">
            <div className="p-1 flex flex-col items-start custom_lg:gap-2 md:gap-0 w-full">
              <label className="w-1/4 text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={editUser.name}
                className="p-1 text-sm w-full border text-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="p-1 flex flex-col items-start custom_lg:gap-2 md:gap-0 w-full">
              <label className="w-1/4 text-sm font-medium text-[#6B6F7B]">Mail ID</label>
              <input
                type="mail"
                placeholder="Enter Mail ID"
                value={editUser.email}
                className="w-full p-1 text-sm border text-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="p-1 flex flex-col items-start custom_lg:gap-2 md:gap-0 w-full">
              <label className="w-full text-sm font-medium text-[#6B6F7B]">Phone Number</label>
              <input
                type="number"
                placeholder="enter number"
                value={editUser.phone}
                className="w-full p-1 text-sm border text-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="p-1 flex flex-col items-start custom_lg:gap-2 md:gap-0 w-full">
              <label className="w-full text-sm font-medium text-[#6B6F7B]">Experience</label>
              <input
                type="text"
                placeholder="0-4 years"
                value={editUser.experience}
                className="w-full p-1 text-sm border text-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>
            <div className="p-1 flex flex-col items-start custom_lg:gap-2 md:gap-0 w-full">
              <label className="w-full text-sm font-medium text-[#6B6F7B]">Job Assigned</label>
              <select
                onChange={handleSelection}
                value={selectedOption}
                className={`w-full p-1 text-sm border text-center border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${items.length === 0 ? "text-gray-500" : "text-black"} `}>
                <option value="" disabled>Select Roles</option>
                <option value="EM">EM</option>
                <option value="PM">PM</option>
                <option value="SDE II">SDE II</option>
                <option value="SDE III">SDE III</option>
                <option value="DevOps I">DevOps I</option>
                <option value="SDET I">SDET I</option>
                <option value="SDET II">SDET II</option>
              </select>
            </div>
            
            <div className='w-1/2 flex items-center justify-start '>
                    <div className='w-[300px]  gap-x-4'>
                      <ul className='flex flex-wrap justify-start gap-4 items-center ' > {items.map((item, index) => (<li key={index} className=" flex justify-center items-center h-[32px] border border-[#49454F] pl-1 pr-1 rounded-lg  text-[#49454F]  "> {item} <button
                        onClick={() => removeItem(item)}
                        className='pl-2' ><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.8 11.25L0.75 10.2L4.95 6L0.75 1.8L1.8 0.75L6 4.95L10.2 0.75L11.25 1.8L7.05 6L11.25 10.2L10.2 11.25L6 7.05L1.8 11.25Z" fill="#49454F" />
                        </svg>
                      </button> </li>))} </ul>
                    </div>
                  </div>

          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleEditUserClose}
            className="text-white border py-1 px-3 rounded-full bg-[#056DDC]"
          >
            SAVE
          </button>
        </DialogActions>
      </BootstrapDialog>
 

         
        </div>
      </div>
    </div>
  )
}

export { Interviewer as InternalInterviewer }
