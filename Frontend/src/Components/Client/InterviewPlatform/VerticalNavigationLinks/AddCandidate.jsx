import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AddCandidate() {

   const baseUrl = import.meta.env.VITE_BASE_URL

   const [firstname,setFirstName] = useState('');
   const [lastname,setLastName] = useState('');
   const [email,setEmail] = useState('');
   const [phone,setPhone] = useState('');
   const [resume,setResume] = useState(null);
   const [photo,setPhoto] = useState(null);

   const handleSubmit = async (e)=>{
    e.preventDefault();

        const formData = new FormData();
        formData.append('firstname',firstname);
        formData.append('lastname',lastname);
        formData.append('email',email);
        formData.append('phoneNumber',phone);
        formData.append('resume',resume);
        formData.append('photo',photo);

    try {
        const response = await axios.post(`${baseUrl}/api/v1/client/add-candidate`,formData,{
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
              },
        });
        console.log(response.data);
        alert("Candidate Added Successfully");
        
    } catch (error) {
        console.error("error while submitting the form", error);
        alert("error while subitting the form")
    }
   }
    

  

    const styles = {
        container: {
          width: '100%',
          maxWidth: '600px',
          margin: '20px 0px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#212529',
        },
        formRow: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        },
        label: {
          fontSize: '14px',
          fontWeight: 600,
          width: '35%',
          height:'100%',
          marginRight: '20px',
          textAlign: 'right',
          alignItems:'center',
          justifyContent:'center',
        },
        input: {
          fontSize: '14px',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '60%',
          
        },
        select: {
          fontSize: '14px',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '60%',
        },
        uploadBox: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ccc',
          borderRadius: '6px',
          padding: '10px',
          marginBottom: '10px',
          cursor: 'pointer',
          
        },
        uploadIcon: {
          marginRight: '5px',
          fontSize: '18px',
        },
        textarea: {
          fontSize: '14px',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '100%',
          resize: 'none',
        },
        essentialsList: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '10px',
        },
        essentialTag: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'white',
          fontSize: '12px',
          fontWeight: 600,
          padding: '6px 12px',
          borderRadius: '10px',
          border: '1px solid #ccc',
        },
        removeButton: {
          marginLeft: '8px',
          background: 'none',
          border: 'none',
          color: 'black',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
        },
        saveButton: {
          display: 'block',
          width: '15%',
          marginLeft: '500px',
          padding: '10px',
          backgroundColor: '#007aff',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          fontSize: '16px',
          cursor: 'pointer',
          textAlign: 'center',
        },
        uploadIconImage: {
            width: '24px', // Adjust as per design
            height: '24px',
            marginRight: '8px',
          },
          
      };

    const [data, setData] = useState([
        {
            name: "John Smith",
            experience: "7 Years 3 Months",
            mobile: "1234567890",
            email: "john.smith@example.com",
            company: "Abc Corp",
        },
        {
            name: "Emma Johnson",
            experience: "5 Years 6 Months",
            mobile: "9876543210",
            email: "emma.johnson@example.com",
            company: "Tech Solutions",
        },
        {
            name: "Michael Brown",
            experience: "3 Years 2 Months",
            mobile: "9123456780",
            email: "michael.brown@example.com",
            company: "Innovatech",
        },
        {
            name: "Sophia Garcia",
            experience: "10 Years 8 Months",
            mobile: "8123456789",
            email: "sophia.garcia@example.com",
            company: "FutureWorks",
        },
        {
            name: "James Miller",
            experience: "2 Years 4 Months",
            mobile: "7012345678",
            email: "james.miller@example.com",
            company: "HealthCare Inc.",
        },
        {
            name: "Olivia Martinez",
            experience: "6 Years 5 Months",
            mobile: "9923456789",
            email: "olivia.martinez@example.com",
            company: "Green Energy",
        },
        {
            name: "Liam Anderson",
            experience: "4 Years 7 Months",
            mobile: "9876543120",
            email: "liam.anderson@example.com",
            company: "Bright Minds",
        },
        {
            name: "Isabella Wilson",
            experience: "8 Years 1 Month",
            mobile: "8098765432",
            email: "isabella.wilson@example.com",
            company: "Smart Solutions",
        },
        {
            name: "Benjamin Thomas",
            experience: "3 Years 10 Months",
            mobile: "9212345678",
            email: "benjamin.thomas@example.com",
            company: "Data Analytics Co.",
        },
        {
            name: "Charlotte Moore",
            experience: "9 Years 11 Months",
            mobile: "8543219876",
            email: "charlotte.moore@example.com",
            company: "AI Innovations",
        },
    ]);

   



    return (
        <div>


<div style={styles.container}   >
      <form action="">
      <div style={styles.formRow}>
        <label style={styles.label}>First Name</label>
        <input type="text" name='firstName' placeholder="Enter First Name"  style={styles.input} className='text-black' />
      </div>
      <div style={styles.formRow} className='' >
        <label style={styles.label} className='' >Last Name</label>
        <input className='' name='lastName' type="text"  placeholder='Enter Last Name' style={styles.input}  />
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Email</label>
        <input className='' name='email' type="email"  placeholder='Enter Email'  style={styles.input}  />
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Phone Number</label>
        <input type="number" name='phoneNumber'  placeholder='Enter Phone No.' style={styles.input} />
      </div>

      <div style={styles.formRow}>
        
      </div>

      <div style={styles.formRow}  >
  <label style={styles.label}>Upload Resume</label>
  <div style={{ width: '60%' }}>
  <div class="w-[100%]  flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-all">
                        <label for="fileInput" class="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4398 8.8999C20.0398 9.2099 21.5098 11.0599 21.5098 15.1099L21.5098 15.2399C21.5098 19.7099 19.7198 21.4999 15.2498 21.4999L8.72976 21.4999C4.25976 21.4999 2.46976 19.7099 2.46976 15.2399L2.46976 15.1099C2.46976 11.0899 3.91976 9.2399 7.45976 8.9099" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 15.0001L12 3.62012" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.3496 5.85L11.9996 2.5L8.64961 5.85" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="text-sm">Upload Resume</span>
                        </label>
                        <input id="fileInput" type="file" class="hidden" />
                    </div>
  </div>
</div>
<div style={styles.formRow}  >
  <label style={styles.label}>Upload Photo</label>
  <div style={{ width: '60%' }}>
  <div class="w-[100%]  flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-all">
                        <label for="fileInput" class="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4398 8.8999C20.0398 9.2099 21.5098 11.0599 21.5098 15.1099L21.5098 15.2399C21.5098 19.7099 19.7198 21.4999 15.2498 21.4999L8.72976 21.4999C4.25976 21.4999 2.46976 19.7099 2.46976 15.2399L2.46976 15.1099C2.46976 11.0899 3.91976 9.2399 7.45976 8.9099" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 15.0001L12 3.62012" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.3496 5.85L11.9996 2.5L8.64961 5.85" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="text-sm">Upload Photo</span>
                        </label>
                        <input id="fileInput" type="file" class="hidden" />
                    </div>
  </div>
</div>
<button   className="block w-[15%] ml-[500px] p-2  text-white border-none rounded-[20px] text-[16px] cursor-pointer text-center  border-[3px] py-1 px-3   transition ease-linear delay-150 hover:-translate-y-1 hover:scale-110 hover:border-[3px] hover:bg-gradient-to-r from-[#0575E6] via-[#295cde] to-[#133bca] duration-300 ... bg-[#007AFF] "  >Save</button>
</form>
</div>







           
            



        </div>
    )
}

export { AddCandidate as ClientAddCandidate }
