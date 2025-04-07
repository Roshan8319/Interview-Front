import React, { useState, useEffect } from 'react';
import { Trash2, Plus, User, Mail, Phone, Calendar, Lock } from 'lucide-react';
import axios from 'axios';

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

// Move AddUserModal outside the main component
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#E65F2B]">Add New User</h2>
        
        {errors.submit && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-lg text-center">
            {errors.submit}
          </div>
        )}

        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-3">{errors.firstName}</p>}
          </div>
          
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1 ml-3">{errors.lastName}</p>}
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-3">{errors.email}</p>}
          </div>
          
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.contactNumber ? 'border-red-500' : ''}`}
            />
            {errors.contactNumber && <p className="text-red-500 text-xs mt-1 ml-3">{errors.contactNumber}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-3">{errors.password}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-3">{errors.confirmPassword}</p>}
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-3xl hover:bg-gray-300 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#E65F2B] text-white rounded-3xl hover:bg-[#b84c22] transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add User'}
          </button>
        </div>
      </div>
    </div>
  );
};

const InternalUsers = () => {

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);

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
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare data for API
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contactNumber: formData.contactNumber, // Changed from phone
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };
      console.log(userData);
      

      const response = await api.post('api/v1/internal/signUp', userData);
    
      
      if (response.data.success) {
        setShowSuccess(true);
        setRefreshUsers(prev => !prev);
        setIsAddUserModalOpen(false);
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to add user. Please try again.'
      });
      console.error('Error adding user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    api.get('/api/v1/internal/get-internal-users')
      .then((res) => {
        console.log(res.data.data.users);
        
        setData(res.data.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, [refreshUsers]); // Add refreshUsers to dependency array
  
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
    <div className="bg-[#EBDFD7] min-h-screen p-6">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">User registered successfully!</span>
          </div>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Recrumeta Users</h1>

          <button
            type="button"
            onClick={() => setIsAddUserModalOpen(true)}
            class="relative w-[160px] h-10 flex items-center rounded-full border-[1px] border-[#E65F2B] overflow-hidden bg-[#ffffff] cursor-pointer transition-all duration-300 hover:bg-[#E65F2B] active:border-[#E65F2B] group"
          >

            <span class=" pl-2 absolute left-7 text-[#E65F2B] font-semibold transition-all duration-300 group-hover:text-transparent">
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
        </div>

        {data.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">No users found. Add your first user!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((user) => (
              <div 
                key={user.id} 
                className="bg-[#F2EAE5] rounded-xl shadow-md p-4 hover:shadow-lg transition relative"
              >
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
                
                <div className="flex flex-col items-center mb-3">
                  {user.profilePhoto ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                      <img 
                        src={user.profilePhoto} // Cloudinary URL is already complete
                        alt={`${user.name}'s profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <User className="text-blue-600" size={24} />
                    </div>
                  )}
                  <h2 className="text-lg font-semibold text-[#E65F2B] text-center">{user.name}</h2>
                </div>
                
                
                <div className="space-y-2 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <Mail className="mr-2 text-blue-500" size={16} />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 text-green-500" size={16} />
                    <span>{user.contactNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-purple-500" size={16} />
                    <span>Added {user.addedOn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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