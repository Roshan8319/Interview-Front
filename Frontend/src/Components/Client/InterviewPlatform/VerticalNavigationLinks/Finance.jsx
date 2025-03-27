import React, { useState, useEffect } from 'react';




function Finance() {
  const data = [
      {
        "Candidate": "Rohan Sharma",
        "Role": "SDE II",
        "Experience": "4.5 Years",
        "Date": "12/08/2024",
        "Amount": 1500.00
      },
      {
        "Candidate": "Priya Verma",
        "Role": "SDE II",
        "Experience": "3.8 Years",
        "Date": "25/09/2024",
        "Amount": 1400.00
      },
      {
        "Candidate": "Aarav Kapoor",
        "Role": "SDE II",
        "Experience": "5.2 Years",
        "Date": "30/09/2024",
        "Amount": 1600.00
      },
      {
        "Candidate": "Ishita Singh",
        "Role": "SDE II",
        "Experience": "4.0 Years",
        "Date": "07/10/2024",
        "Amount": 1350.00
      },
      {
        "Candidate": "Kabir Mehta",
        "Role": "SDE II",
        "Experience": "4.3 Years",
        "Date": "22/10/2024",
        "Amount": 1450.00
      },
      {
        "Candidate": "Ananya Roy",
        "Role": "SDE II",
        "Experience": "4.1 Years",
        "Date": "10/11/2024",
        "Amount": 1300.00
      },
      {
        "Candidate": "Devansh Patel",
        "Role": "SDE II",
        "Experience": "4.7 Years",
        "Date": "07/12/2024",
        "Amount": 1550.00
      }
  ];

  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

  const currentYear = new Date().getFullYear();
  const years=[];

  for(let year=currentYear; year>=2000; year-- ){
    years.push(year);
  }
  
   

  
  const [filteredData, setFilteredData] = useState(data);
  const [isDataRangeEntered,setIsDataRangeEntered] = useState(false);

  const parseDate = (dateStr) =>{
    const [day, month, year] = dateStr.split('/'); return `${year}/${month}/${day}`;
  };
  

  
   const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear()); 
   const [selectedMonth2, setSelectedMonth2] = useState(new Date().getMonth() + 1); 
   const [selectedDay2, setSelectedDay2] = useState(new Date().getDate());
   const [days2, setDays2] = useState([]); 
   useEffect(() => { 
        const days2InMonth = new Date(selectedYear2, selectedMonth2, 0).getDate(); 
        const days2Array = Array.from({ length: days2InMonth }, (_, i) => i + 1); setDays2(days2Array); }
        , [selectedYear2, selectedMonth2]);
   
   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 
   const [selectedDay, setSelectedDay] = useState(new Date().getDate());
   const [days, setDays] = useState([]); 
   useEffect(() => { 
          const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate(); 
          const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1); setDays(daysArray); }
          , [selectedYear, selectedMonth]);
  
   
   const filterDataByDate = () => {
    
      
    
        console.log("i roshan");
        
      const startDate =new Date (`${selectedYear}/${selectedMonth}/${selectedDay}`);
      const endDate =new Date (`${selectedYear2}/${selectedMonth2}/${selectedDay2}`);
      
      
      
    if (!startDate || !endDate) {
      setFilteredData(data);
      return;
    }
    if (startDate > endDate ) {
      alert("Please mention date in the correct order!!")
    }else{
    
    const filtered = data.filter(item => {
      
      const date =new Date (parseDate(item.Date));
      
      
      return date >= startDate && date <= endDate;
    });
    setFilteredData(filtered);
    setIsDataRangeEntered(true);
  }
  };
    
    
    
  


  return (
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-4 pl-10 pr-5 text-[14px]  '>
      <div className='w-full '>
        <div className='w-full flex font-semibold text-[20px] p-4'>
          <div className='w-[50%]'>
            <h1>Current Dues: <span className='text-[#E65F2B]'>INR 50,000</span></h1>
          </div>
          
        </div>
        <div className='w-full  flex mt-6 gap-16  '>
          <div className='w-full'>
            <table className="w-full text-left ">
              <thead className='text-black'>
                <tr className='border-b-[3px] border-[#E65F2B] ' >
                  <th className='py-2 px-4 max-w-max  text-[15px] font-bold'>Candidate</th>
                  <th className='py-2 px-4 max-w-max  text-[15px] font-bold'>ROLE</th>
                  <th className='py-2 px-4 max-w-max  text-[15px] font-bold'>EXPERIENCE</th>
                  <th className='py-2 px-4 max-w-max  text-[15px] font-bold'>DATE</th>
                  <th className='py-2 px-4 max-w-max  text-[15px] font-bold'>AMOUNT</th>
                </tr>
              </thead>
              <tbody className=''  >
                
                {filteredData.map((data, index) => (  
                  <tr key={index} className={`${index % 2 === 0 ? "bg-[#FFFFFF57]" : (isDataRangeEntered ? "bg-[#FFFFFF57] ": "bg-[#FFFFFF57]" ) } h-[91px]  border-b border-[#E65F2B]  `}>
                    <td className='py-3 px-4 max-w-max font-bold text-[15px] mb-2 text-[#E65F2B]'>{data.Candidate}</td>
                    <td className='py-3 px-4 max-w-max text-[#797979]'>{data.Role}</td>
                    <td className='py-3 px-4 max-w-max text-[#797979]'>{data.Experience}</td>
                    <td className='py-3 px-4 max-w-max text-[#797979]'>{data.Date}</td>
                    <td className='py-3 px-4 max-w-max text-[#797979]'>{data.Amount}</td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Finance;
