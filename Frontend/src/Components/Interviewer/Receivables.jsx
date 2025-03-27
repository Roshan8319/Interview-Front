import React,{useState} from 'react'

function Receivables() {

  const data = [
    {
      "Candidate": "Aryan Gupta",
      "Role": "SDE I",
      "Experience": "2.5 Years",
      "Date": "05/08/2024",
      "Amount": 1100.00
    },
    {
      "Candidate": "Meera Nair",
      "Role": "SDE II",
      "Experience": "3.2 Years",
      "Date": "15/09/2024",
      "Amount": 1250.00
    },
    {
      "Candidate": "Vikram Malhotra",
      "Role": "Tech Lead",
      "Experience": "6.0 Years",
      "Date": "10/10/2024",
      "Amount": 2000.00
    },
    {
      "Candidate": "Simran Kaur",
      "Role": "SDE III",
      "Experience": "5.5 Years",
      "Date": "20/10/2024",
      "Amount": 1800.00
    },
    {
      "Candidate": "Rahul Das",
      "Role": "Senior Developer",
      "Experience": "4.8 Years",
      "Date": "28/11/2024",
      "Amount": 1400.00
    },
    {
      "Candidate": "Ishaan Mishra",
      "Role": "SDE II",
      "Experience": "4.2 Years",
      "Date": "12/12/2024",
      "Amount": 1350.00
    },
    {
      "Candidate": "Tanya Agarwal",
      "Role": "Frontend Developer",
      "Experience": "3.5 Years",
      "Date": "20/12/2024",
      "Amount": 1200.00
    }
];

 const [filteredData, setFilteredData] = useState(data);
  const [isDataRangeEntered,setIsDataRangeEntered] = useState(false);



  return (
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-4 pl-10 pr-5 text-[14px]  '>
      <div className='w-full '>
        <div className='w-full flex font-semibold text-[20px] p-4'>
          <div className='w-[50%]'>
            <h1>Current Receivables: <span className='text-[#E65F2B]'>INR 10,100</span></h1>
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
  )
}

export default Receivables