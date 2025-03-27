import React from 'react';

const Finance = () => {
  // Dummy data for clients and interviewers
  const clientData = [
    { id: 1, name: 'PHONEPAY', payment: 'Paid', month: 'December', amount: 1200 },
    { id: 2, name: 'WAYFAIR', payment: 'Unpaid', month: 'December', amount: 1200 },
    { id: 3, name: 'QUINCE', payment: 'Paid', month: 'December', amount: 1200 },
    { id: 4, name: 'FLIPKART', payment: 'Unpaid', month: 'December', amount: 1200 },
    { id: 5, name: 'FLIPKART', payment: 'Paid', month: 'December', amount: 1200 }
  ];

  const interviewerData = [
    { id: 1, name: 'RAJESH', payment: 'Paid', month: 'December', amount: 1200 },
    { id: 2, name: 'STEVE', payment: 'Unpaid', month: 'December', amount: 1200 },
    { id: 3, name: 'SCOTT', payment: 'Paid', month: 'December', amount: 1200 },
    { id: 4, name: 'BRIAN', payment: 'Unpaid', month: 'December', amount: 1200 },
    { id: 5, name: 'CRISTIE', payment: 'Paid', month: 'December', amount: 1200 }
  ];

  const renderTable = (data, title) => (
    <div className="w-[70%]">
      <h3 className="font-bold text-lg mb-5 ml-1.5">{title}</h3>
      <table className="w-full border-collapse mb-5">
        <thead>
          <tr>
            {['CLIENT', 'PAYMENT', 'MONTH', 'AMOUNT'].map((header) => (
              <th 
                key={header} 
                className="font-semibold text-left border-b border-[#E65F2B] p-3 text-black"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-3 border-b border-[#E65F2B] text-[#E65F2B] font-bold">
                {item.name}
              </td>
              <td className="p-3 border-b border-[#E65F2B]">{item.payment}</td>
              <td className="p-3 border-b border-[#E65F2B]">{item.month}</td>
              <td className="p-3 border-b border-[#E65F2B] flex items-center">
                INR {item.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSummaryCard = () => {
    const summaryItems = [
      { label: 'Paid', amount: 1234000 },
      { label: 'Unpaid', amount: 234500 },
      { label: 'Total', amount: 2234400 }
    ];

    return (
      <div className="mt-[60px] flex flex-col gap-4 items-start">
        {summaryItems.map((item) => (
          <div 
            key={item.label} 
            className="w-[250px] h-20 border border-[#E65F2B] bg-[#F2EAE5] p-5 text-left rounded-xl flex flex-col justify-center"
          >
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 mb-1">{item.label}</span>
              <span className="text-2xl font-bold text-black">
                INR {item.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#EBDFD7]">
      <div className="w-[90%] mx-auto font-sans">
        <section className="flex justify-between p-4">
          {renderTable(clientData, 'CLIENTS')}
          {renderSummaryCard()}
        </section>

        <section className="flex justify-between">
          {renderTable(interviewerData, 'INTERVIEWERS')}
          {renderSummaryCard()}
        </section>
      </div>
    </div>
  );
};

export { Finance as InternalFinance };