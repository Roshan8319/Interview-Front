import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {

  const baseUrl = import.meta.env.VITE_BASE_URL


  const [employment,setEmployment] = useState('FT');
  const [formData, setFormData] = useState({jobTitle:"", jobRole:"",jobDescription:"", employmentType:"FT", hiringManagerEmail:"", totalPositions:"", essentials:[]})
  const handleChange =(e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      
      console.log(baseUrl);
      const dataToSend = {
        ...formData,
        essentials: selectedEssentials.join(','), 
        totalPositions: Number(formData.totalPositions), 
        employmentType: employment,
      }
      console.log(dataToSend);
      const response = await axios.post(`${baseUrl}/api/v1/client/add-job`, dataToSend, {
        withCredentials: true, // Ensures cookies are sent
        
      });
      console.log(response);
      
      console.log("job added");
      
    } catch (error) {
      console.log(error,"something error in submit");
      
    }

   

  }


  const [selectedEssentials, setSelectedEssentials] = useState([]);
  const essentialOptions = ['Java', 'OOPS', 'Springboot', 'React.js', 'AWS', 'Kafka'];

  const handleAddEssential = (event) => {
    const value = event.target.value;
    if (value && !selectedEssentials.includes(value)) {
      setSelectedEssentials([...selectedEssentials, value]);
    }
    event.target.value = ''; // Reset the dropdown to the default option
  };

  const handleRemoveEssential = (essential) => {
    setSelectedEssentials(selectedEssentials.filter((item) => item !== essential));
  };

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

  

  return (
    <div className='flex gap-x-14' >
    <div style={styles.container}   >
      <form action="">
      <div style={styles.formRow}>
        <label style={styles.label}>Job Title</label>
        <input type="text" name='jobTitle' placeholder="Enter Job Title" value={formData.jobTitle} onChange={handleChange} style={styles.input} className='text-black' />
      </div>
      <div style={styles.formRow} className='' >
        <label style={styles.label} className='' >Job Role</label>
        <input className='' name='jobRole' type="text" value={formData.jobRole} onChange={handleChange} placeholder='Enter Job Role' style={styles.input}  />
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Hiring Manager Email</label>
        <input className='' name='hiringManagerEmail' type="email" value={formData.hiringManagerEmail} onChange={handleChange} placeholder='Enter Email'  style={styles.input}  />
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Total Positions</label>
        <input type="number" name='totalPositions' value={formData.totalPositions} onChange={handleChange} placeholder='Enter No. of Positions' style={styles.input} />
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Employment Type</label>
        <select style={styles.select} name='employmentType' value={formData.employment} onChange={(e)=>setEmployment(e.target.value)} >
          <option value="FT">Full Time</option>
          <option value="INT">Internship</option>
        </select>
      </div>

      <div style={styles.formRow}  >
  <label style={styles.label}>Job Description</label>
  <div style={{ width: '60%' }}>
    <textarea
      placeholder="Paste Job Description Here"
      rows="4"
      name='jobDescription'
      value={formData.jobDescription}
      onChange={handleChange}
      style={styles.textarea}
    ></textarea>
  </div>
</div>

      <div style={styles.formRow}>
        <label style={styles.label}>Essentials</label>
        <div style={{ width: '60%' }}>
          <select style={styles.select} name='essentials' onChange={handleAddEssential}>
            <option value="">Select an Essential</option>
            {essentialOptions.map((essential) => (
              <option key={essential} value={essential}>
                {essential}
              </option>
            ))}
          </select>
          <div style={styles.essentialsList}>
            {selectedEssentials.map((essential) => (
              <div key={essential} style={styles.essentialTag}>
                {essential}
                <button
                  style={styles.removeButton}
                  onClick={() => handleRemoveEssential(essential)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleSubmit}  className="block w-[15%] ml-[500px] p-2  text-white border-none rounded-[20px] text-[16px] cursor-pointer text-center  border-[3px] py-1 px-3   transition ease-linear delay-150 hover:-translate-y-1 hover:scale-110 hover:border-[3px] hover:bg-gradient-to-r from-[#0575E6] via-[#295cde] to-[#133bca] duration-300 ... bg-[#007AFF] "  >Save</button>
    
      </form>
    </div>
    <div className=' ' style={styles.container}   >
              
        

    </div>
    </div>
  );
};

export default AddJob;
