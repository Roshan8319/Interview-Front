import React, { useState, useEffect } from 'react';
import { Trash2, Plus, User, Mail, Phone, Calendar } from 'lucide-react';

const InternalUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@recrumeta.com',
      phone: '+1 (555) 123-4567',
      addedOn: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@recrumeta.com',
      phone: '+1 (555) 987-6543',
      addedOn: '2024-02-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@recrumeta.com',
      phone: '+1 (555) 246-8135',
      addedOn: '2024-03-10'
    },
    {
      id: 4,
      name: 'Emily Clark',
      email: 'emily.clark@recrumeta.com',
      phone: '+1 (555) 654-3210',
      addedOn: '2024-04-05'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@recrumeta.com',
      phone: '+1 (555) 321-9876',
      addedOn: '2024-05-15'
    },
    {
      id: 6,
      name: 'Jessica Brown',
      email: 'jessica.brown@recrumeta.com',
      phone: '+1 (555) 789-0123',
      addedOn: '2024-06-25'
    },
  ]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      alert('Please fill in all fields');
      return;
    }

    const userToAdd = {
      id: users.length + 1,
      ...newUser,
      addedOn: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, userToAdd]);
    setNewUser({ name: '', email: '', phone: '' });
    setIsAddUserModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const AddUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#E65F2B]">Add New User</h2>
        
        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
            />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newUser.phone}
              onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => setIsAddUserModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-3xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleAddUser}
            className="px-4 py-2 bg-[#E65F2B] text-white rounded-3xl hover:bg-[#b84c22] transition"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#EBDFD7] min-h-screen p-6">
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

        {users.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">No users found. Add your first user!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
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
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <User className="text-blue-600" size={24} />
                  </div>
                  <h2 className="text-lg font-semibold text-[#E65F2B] text-center">{user.name}</h2>
                </div>
                
                <div className="space-y-2 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <Mail className="mr-2 text-blue-500" size={16} />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 text-green-500" size={16} />
                    <span>{user.phone}</span>
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

        {isAddUserModalOpen && <AddUserModal />}
      </div>
    </div>
  );
};

export { InternalUsers as InternalUsers };