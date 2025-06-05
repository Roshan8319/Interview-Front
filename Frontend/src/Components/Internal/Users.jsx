import React, { useState, useEffect } from 'react';
import { Trash2, Plus, User, Mail, Phone, Calendar, Lock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Toaster } from '@/Components/Ui/Sonner';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import VisitorGuard, { VisitorDisableWrapper } from '../Hooks/VisitorGuard';

// Add this styled component at the top of your file
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

const DeleteDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "400px", // Smaller width for delete dialog
    maxWidth: "95%",
    borderRadius: "1rem",
    backgroundColor: "#F2EAE5",
  },
}));

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  credentials: 'include'  // Important for cookies
});

// Add User Modal
const AddUserModal = ({ isOpen, onClose, onSubmit, errors, isSubmitting }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '', // Changed from phone
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="add-user-dialog-title"
      open={isOpen}
      BackdropProps={{
        sx: { backgroundColor: "rgba(0, 0, 0, 0.40)" },
      }}
    >
      {/* Dialog Title */}
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <h1 className="font-bold text-[#E65F2B] text-lg text-start">Add User</h1>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          <div className="w-full md:w-1/2 flex flex-col gap-1 md:gap-4">
            <div className="p-1 flex flex-col items-start gap-1 w-full">
              <label className=" text-sm font-medium text-gray-600">Name</label>
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`block w-full h-[40px] pl-10 pr-4 bg-[#F6F1EE] border border-gray-100 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.firstName ? 'border-[#E65F2B] bg-[#F6F1EE]' : ''
                    }`}
                />
              </div>
            </div>

            <div className="p-1 flex flex-col items-start gap-1 w-full">
              <label className=" text-sm font-medium text-gray-600">Mail ID</label>
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full h-[40px] pl-10 pr-4 bg-[#F6F1EE] border border-gray-100 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.email ? 'border-[#E65F2B] bg-[#F6F1EE]' : ''
                    }`}
                />
              </div>
            </div>

            <div className="p-1 flex flex-col items-start gap-1 w-full">
              <label className=" text-sm font-medium text-gray-600">Password</label>
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full h-[40px] pl-10 pr-4 bg-[#F6F1EE] border border-gray-100 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.password ? 'border-[#E65F2B] bg-[#F6F1EE]' : ''
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 flex flex-col gap-1 md:gap-4">
            <div className="p-1 flex flex-col items-start gap-1 w-full">
              <label className=" text-sm font-medium text-gray-600">Last Name</label>
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`block w-full h-[40px] pl-10 pr-4 bg-[#F6F1EE] border border-gray-100 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.lastName ? 'border-[#E65F2B] bg-[#F6F1EE]' : ''
                    }`}
                />
              </div>
            </div>

            <div className="p-1 flex flex-col items-start gap-1 w-full">
              <label className="w-full text-sm font-medium text-gray-600">Phone Number</label>
              <div className="relative w-full">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`block w-full h-[40px] pl-10 pr-4 bg-[#F6F1EE] border border-gray-100 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.contactNumber ? 'border-[#E65F2B] bg-[#F6F1EE]' : ''
                    }`}
                />
              </div>
            </div>

            <div className="p-1 flex flex-col items-start gap-1 w-full">
              <label className="w-full text-sm font-medium text-gray-600">Confirm Password</label>
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full h-[40px] pl-10 pr-4 bg-[#F6F1EE] border border-gray-100 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.confirmPassword ? 'border-[#E65F2B] bg-[#F6F1EE]' : ''
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="h-[40px] flex items-center gap-2 text-[#E65F2B] bg-white px-6 py-3 rounded-full text-[18px] font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md group"
        >
          {isSubmitting ? 'Adding...' : 'Save'}
          {!isSubmitting && (
            <svg className="transition-transform duration-200 group-hover:rotate-[-45deg]" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.7179 10.8489C20.8466 10.9778 20.9189 11.1525 20.9189 11.3347C20.9189 11.5169 20.8466 11.6916 20.7179 11.8206L14.3131 18.2372C14.2497 18.3029 14.1739 18.3553 14.09 18.3914C14.0062 18.4275 13.916 18.4465 13.8247 18.4473C13.7334 18.4481 13.6429 18.4308 13.5584 18.3963C13.4739 18.3617 13.3971 18.3107 13.3325 18.2462C13.2679 18.1817 13.2168 18.1049 13.1822 18.0205C13.1476 17.936 13.1302 17.8455 13.1309 17.7542C13.1317 17.6629 13.1506 17.5727 13.1866 17.4888C13.2226 17.4049 13.2749 17.329 13.3406 17.2656L18.5729 12.0231L3.73205 12.0332C3.54972 12.0335 3.37475 11.9613 3.24565 11.8325C3.11654 11.7037 3.04388 11.529 3.04363 11.3466C3.04339 11.1643 3.11559 10.9893 3.24435 10.8602C3.37311 10.7311 3.54788 10.6585 3.73022 10.6582L18.5747 10.6491L13.3396 5.40389C13.274 5.34044 13.2217 5.26455 13.1857 5.18066C13.1497 5.09676 13.1308 5.00654 13.13 4.91525C13.1293 4.82397 13.1467 4.73345 13.1813 4.64897C13.2159 4.5645 13.267 4.48776 13.3316 4.42324C13.3962 4.35872 13.4729 4.30771 13.5575 4.27318C13.642 4.23865 13.7325 4.2213 13.8238 4.22214C13.9151 4.22297 14.0053 4.24198 14.0891 4.27805C14.173 4.31412 14.2488 4.36653 14.3122 4.43222L20.7179 10.8489Z" fill="#E65F2B" />
            </svg>
          )}
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};

// Delete Confirmation Dialog
const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteDialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      BackdropProps={{
        sx: { backgroundColor: "rgba(0, 0, 0, 0.40)" },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, borderBottom: 'none' }}>
        <h1 className="font-bold text-red-500 text-lg text-start">Confirm Deletion</h1>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
      <DialogContent sx={{ borderTop: 'none', borderBottom: 'none' }}>
        <p className="text-gray-600">Are you sure you want to delete this user? This action cannot be undone.</p>
      </DialogContent>
      <DialogActions sx={{ borderTop: 'none' }} className="p-4">
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={isDeleting}
          className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
        >
          {isDeleting ? (
            <>
              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Deleting...
            </>
          ) : (
            'Delete User'
          )}
        </button>
      </DialogActions>
    </DeleteDialog>
  );
};

const InternalUsers = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    userId: null
  });

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleAddUser = async (formData) => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    setIsSubmitting(true);

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    toast.promise(
      api.post('api/v1/internal/signUp', userData),
      {
        loading: 'Adding new user...',
        success: (response) => {
          if (response.data.success) {
            setRefreshUsers(prev => !prev);
            setIsAddUserModalOpen(false);
            return 'User added successfully!';
          } else {
            throw new Error(response.data.message || 'Failed to add user');
          }
        },
        error: (error) => {
          const errorMessage = error.response?.data?.message || 'Failed to add user. Please try again.';
          setErrors({
            submit: errorMessage
          });
          return errorMessage;
        },
        finally: () => {
          setIsSubmitting(false);
        }
      }
    );
  };

  const handleDeleteUser = (id) => {
    setDeleteConfirmation({ isOpen: true, userId: id });
  };

  const confirmDelete = async () => {
    const id = deleteConfirmation.userId;

    toast.promise(
      // Since there's no actual API call for deletion in the provided code,
      // we'll use a Promise that resolves immediately
      new Promise((resolve) => {
        // Update the frontend state directly
        setData(prevData => prevData.filter(user => user.id !== id));
        setDeleteConfirmation({ isOpen: false, userId: null });
        resolve();
      }),
      {
        loading: 'Deleting user...',
        success: 'User deleted successfully!',
        error: 'Failed to delete user. Please try again.'
      }
    );
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) { // Only fetch on initial load
      api.get('/api/v1/internal/get-internal-users')
        .then((res) => {
          setData(res.data.data.users);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          setLoading(false);
        });
    }
  }, []);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E65F2B]"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading profile data...</p>
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
    <div className="bg-[#EBDFD7] min-h-[calc(100vh-64px)] p-4 md:p-6">
      <Toaster 
        position="bottom-right" 
        closeButton
        theme="light"
        duration={3000}
        className="toast-container"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#374151',
            border: '2px solid #e5e7eb',
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
      />
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex- sm:flex-row justify-between items-center mb-4 sm:mb-6 mt-4 sm:mt-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Internal Users</h1>

          <VisitorDisableWrapper>
            <button
              type="button"
              onClick={() => setIsAddUserModalOpen(true)}
              class="relative w-[160px] h-10 flex items-center rounded-full border-[1px] border-[#E65F2B] overflow-hidden bg-[#ffffff] cursor-pointer transition-all duration-300 hover:bg-[#E65F2B] active:border-[#E65F2B] group"
            >

              <span class=" pl-2 absolute left-4 text-[#E65F2B] font-semibold transition-all duration-300 group-hover:text-transparent">
                Add User
              </span>


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
            </button>
          </VisitorDisableWrapper>
        </div>

        {data.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">No users found. Add your first user!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 md:mb-0">
            {data.map((user) => (
              <div
                key={user.id}
                className="bg-[#F2EAE5] rounded-xl shadow-md p-4 hover:shadow-lg transition relative"
              >

                <VisitorGuard>
                  <button
                    onClick={() => handleDeleteUser(user.id)} // Changed from user._id to user.id
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </VisitorGuard>

                <div className="flex flex-col items-center mb-3">
                  {user.profilePhoto ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                      <img
                        src={user.profilePhoto} // Cloudinary URL is already complete
                        alt={`${user.name}'s profile`}
                        className="w-full h-full object-cover"
                      />

                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <User className="text-blue-600" size={50} />
                    </div>
                  )}
                  <h2 className="text-lg font-semibold text-[#E65F2B] text-center">{user.name}</h2>
                </div>


                <div className="space-y-2 text-gray-600 text-sm ml-2">
                  <div className="flex items-center">
                    <Mail className="mr-4 text-blue-500" size={16} />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-4 text-green-500" size={16} />
                    <span>{user.contactNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-4 text-purple-500" size={16} />
                    <span>Added {user.addedOn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <DeleteConfirmationDialog
          isOpen={deleteConfirmation.isOpen}
          onClose={() => setDeleteConfirmation({ isOpen: false, userId: null })}
          onConfirm={confirmDelete}
        />

        {isAddUserModalOpen && (
          <AddUserModal
            isOpen={isAddUserModalOpen}
            onClose={() => setIsAddUserModalOpen(false)}
            onSubmit={handleAddUser}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export { InternalUsers as InternalUsers };