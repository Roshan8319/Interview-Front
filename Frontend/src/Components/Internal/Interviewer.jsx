import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

// Constants
const DOMAINS = ["All", "Backend", "Frontend", "DevOps", "AI/ML", "Testing", "Designing"];
const EXPERIENCE_RANGES = [
  { label: "All", value: "All" },
  { label: "0-3 Years", value: "0-3" },
  { label: "4-8 Years", value: "4-8" },
  { label: "9-12 Years", value: "9-12" },
  { label: "12+ Years", value: "12+" }
];

// Styled Components
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "950px",
    borderRadius: "1rem",
    backgroundColor: "#F2EAE5",
  },
}));

function Interviewer() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // State Management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    domain: "All",
    status: "All",
  });
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [items, setItems] = useState([]);

  // Data Fetching
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/v1/internal/getAllInterviewers`,
          { withCredentials: true }
        );
        if (mounted) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [baseUrl]);

  // Memoized Filtered Data
  const filteredData = useMemo(() => {
    return data.filter((user) => {
      const matchesSearch = !searchTerm.trim() ||
        (user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.toString().includes(searchTerm));

      const matchesDomain = selectedFilters.domain === "All" ||
        user.strength === selectedFilters.domain;

      // Updated experience range filtering
      const matchesExperience = selectedFilters.status === "All" ||
        (user.experienceInYears && (() => {
          const exp = Number(user.experienceInYears);
          switch (selectedFilters.status) {
            case "0-3": return exp >= 0 && exp <= 3;
            case "4-8": return exp >= 4 && exp <= 8;
            case "9-12": return exp >= 9 && exp <= 12;
            case "12+": return exp > 12;
            default: return false;
          }
        })());

      return matchesSearch && matchesDomain && matchesExperience;
    });
  }, [data, searchTerm, selectedFilters]);

  // Event Handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter Selection
  const handleSelect = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  // Edit User Handlers
  const handleEditUserOpen = (name, email, phone, experienceInYears, technicalSkills, strength) => {
    setEditUserOpen(true);
    setEditUser({
      name,
      email,
      phone,
      experience: experienceInYears,
      strength: strength // Add this line
    });
    setItems(technicalSkills || []);
  };

  // Close Edit User Dialog
  const handleEditUserClose = () => {
    setEditUserOpen(false);
    setEditUser({ name: "", email: "", phone: "", experience: "" });
    setItems([]);
    setSelectedOption("");
  };

  // Handle Input Change
  const handleInputChange = (field, value) => {
    if (field === 'experience') {
      // Convert to number and check if it's negative
      const numValue = Number(value);
      if (numValue < 0) {
        toast.error('Experience cannot be negative');
        return;
      }
      // Optional: Limit to 2 decimal places
      value = Math.round(numValue * 100) / 100;
    }
    setEditUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add Item to Skills
  const handleSelection = (e) => {
    const newSkill = e.target.value.trim();
    if (!newSkill) {
      toast.error('Please enter a skill');
      return;
    }
    if (!items.includes(newSkill)) {
      setItems(prev => [...prev, newSkill]);
      setSelectedOption("");
    } else {
      toast.error('This skill is already added');
    }
  };

  // Remove Item from Skills
  const removeItem = (itemToRemove) => {
    setItems(prev => prev.filter(item => item !== itemToRemove));
    toast.success('Skill removed');
  };

  // Edit User Submission
  const handleEditSubmit = async () => {
    try {
      // Validate required fields
      if (!editUser.name.trim()) {
        toast.error('Name is required');
        return;
      }

      if (!editUser.experience) {
        toast.error('Experience is required');
        return;
      }

      if (items.length === 0) {
        toast.error('Please select at least one technical skill');
        return;
      }

      // Create the updated user object
      const updatedUser = {
        firstName: editUser.name.trim(),
        email: editUser.email,
        phone: editUser.phone,
        experienceInYears: Number(editUser.experience),
        technicalSkills: items,
        strength: editUser.strength
      };

      // Show loading toast
      const loadingToast = toast.loading('Updating interviewer...');

      const response = await axios.put(
        `${baseUrl}/api/v1/internal/updateInterviewer/${editUser.email}`,
        updatedUser,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.data.success) {
        toast.success('Interviewer updated successfully!');
        handleEditUserClose();
        // Refresh the data
        fetchData();
      } else {
        toast.error(response.data.message || 'Failed to update interviewer');
      }
    } catch (error) {
      console.error('Error updating interviewer:', error);
      toast.error(
        error.response?.data?.message ||
        'An error occurred while updating. Please try again.'
      );
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EBDFD7] items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E65F2B]"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading Interviewer data...</p>
        </div>
      </div>
    );
  }

  // Statistics
  const statistics = [
    { label: "Total Interviewers", value: data.length },
    {
      label: "0-3 Years",
      value: data.filter(user => user.experienceInYears >= 0 && user.experienceInYears <= 3).length
    },
    {
      label: "4-8 Years",
      value: data.filter(user => user.experienceInYears >= 4 && user.experienceInYears <= 8).length
    },
    {
      label: "9-12 Years",
      value: data.filter(user => user.experienceInYears >= 9 && user.experienceInYears <= 12).length
    },
    {
      label: "12+ Years",
      value: data.filter(user => user.experienceInYears > 12).length
    }
  ];

  {/* Searchbar Components */ }
  const SearchBar = ({ searchTerm, handleSearch }) => (
    <div className="w-[450px] h-[40px] flex justify-around items-center border-2 border-[#F4F4F4] bg-white rounded-[28px] pr-1 pl-1">
      <input
        className="w-[358px] h-[37px] ml-1 text-[#979DA3] border-none focus:outline-none"
        type="text"
        placeholder="Search by Name, Email & Mobile Number"
        value={searchTerm}
        onChange={(e) => handleSearch(e)}
      />
      <button>
        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
        </svg>
      </button>
    </div>
  );

  {/* Add Interviewer Button */ }
  const AddInterviewerButton = ({ onClick }) => (
    <button
      className="relative w-[200px] h-10 flex items-center rounded-full border border-[#E65F2B] overflow-hidden bg-white group transition-all duration-300"
      onClick={onClick}
    >
      <span className="absolute right-0 h-full w-10 bg-[#cd4b18] flex items-center justify-center group-hover:w-full transition-all duration-300">
        <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </span>
      <span className="pl-2 w-[calc(100%-2.5rem)] text-[#E65F2B] font-semibold group-hover:opacity-0 transition-opacity duration-200">
        Add Interviewer
      </span>
    </button>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Toaster
          position="bottom-right"
          reverseOrder={true}
          toastOptions={{
            className: '',
            duration: 3000,
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
            },
            success: {
              style: {
                border: '2px solid #359E45',
              },
              iconTheme: {
                primary: '#359E45',
                secondary: 'white',
              },
            },
            error: {
              style: {
                border: '2px solid #EF4444',
              },
              iconTheme: {
                primary: '#EF4444',
                secondary: 'white',
              },
            },
          }}
          gutter={-40}
          containerStyle={{
            bottom: '40px',
            right: '30px',
          }}
        />
        {/* Header Section */}
        <div className="flex justify-end items-center gap-5">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <AddInterviewerButton onClick={() => navigate('/internal/addinterviewer')} />
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-5 gap-4">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white/35 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-white/20 rounded-xl p-4 space-y-4">
          {/* Strength Filter */}
          <div className="flex items-center space-x-4">
            <span className="font-bold text-gray-700">Strength</span>
            <div className="flex gap-2">
              {DOMAINS.map((domain) => (
                <button
                  key={domain}
                  onClick={() => handleSelect("domain", domain)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${selectedFilters.domain === domain
                    ? "bg-[#E65F2B] text-white"
                    : "bg-[#F6F1EE] text-[#E65F2B] hover:bg-[#E65F2B]/10"
                    }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div className="flex items-center space-x-4">
            <span className="font-bold text-gray-700">Experience</span>
            <div className="flex gap-2">
              {EXPERIENCE_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleSelect("status", range.value)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${selectedFilters.status === range.value
                    ? "bg-[#E65F2B] text-white"
                    : "bg-[#F6F1EE] text-[#E65F2B] hover:bg-[#E65F2B]/10"
                    }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/35 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#E65F2B]/5">
              <tr>
                {["Users", "Email ID", "Phone No", "Strength", "Skills", "Experience", ""].map((header) => (
                  <th key={header} className="py-4 px-6 text-[#E65F2B] font-semibold text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#F6F1EE]/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-medium">{user.firstName}</td>
                    <td className="py-4 px-6 text-gray-600">{user.email}</td>
                    <td className="py-4 px-6 text-gray-600">{user.phone}</td>
                    <td className="py-4 px-6 text-gray-600">{user.strength}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {user.technicalSkills ? user.technicalSkills.join(", ") : "-"}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{user.experienceInYears + " Years"}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleEditUserOpen(
                          user.firstName,
                          user.email,
                          user.phone,
                          user.experienceInYears,
                          user.technicalSkills,
                          user.strength
                        )}
                        className="p-2 hover:bg-[#E65F2B]/10 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5 text-[#E65F2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No matching results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Dialog remains the same */}
        <BootstrapDialog
          onClose={handleEditUserClose}
          aria-labelledby="edit-user-dialog-title"
          open={editUserOpen}
          BackdropProps={{
            sx: { backgroundColor: "rgba(0, 0, 0, 0.40)" },
          }}
        >
          {/* Dialog Title */}
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

          {/* Dialog Content */}
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
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
                <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                  <label className="w-1/4 text-sm font-medium text-[#6B6F7B]">
                    Mail ID
                  </label>
                  <input
                    type="mail"
                    placeholder="Enter your email"
                    value={editUser.email}
                    disabled
                    className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B] cursor-not-allowed opacity-75"
                  />
                </div>
                <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                  <label className="w-full text-sm font-medium text-[#6B6F7B]">
                    Phone Number
                  </label>
                  <input
                    placeholder="enter number"
                    value={editUser.phone}
                    disabled
                    className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B] cursor-not-allowed opacity-75"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                  <label className="w-full text-sm font-medium text-[#6B6F7B]">
                    Experience
                  </label>
                  <input
                    type="number"
                    placeholder="Enter years of experience"
                    value={editUser.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    onKeyDown={(e) => {
                      // Prevent minus sign
                      if (e.key === '-' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                    min="0"
                    className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>

                <div className="p-1 flex flex-col items-start custom_lg:gap-1 md:gap-0 w-full">
                  <label className="w-full text-sm font-medium text-[#6B6F7B] text-start">
                    Skills
                  </label>
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Enter a skill"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="block w-full h-[32px] border text-left bg-[#F6F1EE] border-gray-100 rounded-lg shadow-sm sm:text-sm px-3 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                    />
                    <button
                      onClick={() => handleSelection({ target: { value: selectedOption } })}
                      className="px-3 bg-[#E65F2B] text-white rounded-lg hover:bg-[#cd4b18] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="w-[90%] flex items-center justify-start">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <ul className="flex flex-wrap justify-start gap-2 items-center">
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="flex text-[12px] items-center py-1 px-2 inline-block border-[1px] rounded-lg outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300"
                        >
                          {item}
                          <button
                            onClick={() => removeItem(item)}
                            className="ml-2 text-red-500 text-[12px] hover:text-red-600"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>

          {/* Save Button */}
          <DialogActions>
            <button
              onClick={handleEditSubmit}
              className="h-[40px] flex items-center gap-2 text-[#E65F2B] bg-white px-6 py-3 rounded-full text-[18px] font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md group"
            >
              Save
              <svg className="transition-transform duration-200 group-hover:rotate-[-45deg]" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.7179 10.8489C20.8466 10.9778 20.9189 11.1525 20.9189 11.3347C20.9189 11.5169 20.8466 11.6916 20.7179 11.8206L14.3131 18.2372C14.2497 18.3029 14.1739 18.3553 14.09 18.3914C14.0062 18.4275 13.916 18.4465 13.8247 18.4473C13.7334 18.4481 13.6429 18.4308 13.5584 18.3963C13.4739 18.3617 13.3971 18.3107 13.3325 18.2462C13.2679 18.1817 13.2168 18.1049 13.1822 18.0205C13.1476 17.936 13.1302 17.8455 13.1309 17.7542C13.1317 17.6629 13.1506 17.5727 13.1866 17.4888C13.2226 17.4049 13.2749 17.329 13.3406 17.2656L18.5729 12.0231L3.73205 12.0332C3.54972 12.0335 3.37475 11.9613 3.24565 11.8325C3.11654 11.7037 3.04388 11.529 3.04363 11.3466C3.04339 11.1643 3.11559 10.9893 3.24435 10.8602C3.37311 10.7311 3.54788 10.6585 3.73022 10.6582L18.5747 10.6491L13.3396 5.40389C13.274 5.34044 13.2217 5.26455 13.1857 5.18066C13.1497 5.09676 13.1308 5.00654 13.13 4.91525C13.1293 4.82397 13.1467 4.73345 13.1813 4.64897C13.2159 4.5645 13.267 4.48776 13.3316 4.42324C13.3962 4.35872 13.4729 4.30771 13.5575 4.27318C13.642 4.23865 13.7325 4.2213 13.8238 4.22214C13.9151 4.22297 14.0053 4.24198 14.0891 4.27805C14.173 4.31412 14.2488 4.36653 14.3122 4.43222L20.7179 10.8489Z" fill="#E65F2B" />
              </svg>
            </button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
}

export { Interviewer as InternalInterviewer };
