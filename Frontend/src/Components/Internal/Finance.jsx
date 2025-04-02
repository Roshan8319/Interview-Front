import React from 'react';

const Finance = () => {
  // Dummy data for clients and interviewers
  const clientData = [
    { id: 1, name: 'PhonePay', payment: 'Paid', month: 'January', amount: 25000 },
    { id: 2, name: 'WayFair', payment: 'Unpaid', month: 'May', amount: 45000 },
    { id: 3, name: 'Quince', payment: 'Paid', month: 'July', amount: 67000 },
    { id: 4, name: 'Flipkart', payment: 'Unpaid', month: 'September', amount: 56000 },
    { id: 5, name: 'Shopsy', payment: 'Paid', month: 'December', amount: 90000 }
  ];

  const interviewerData = [
    { id: 1, name: 'Rajesh', payment: 'Paid', month: 'December', amount: 12000 },
    { id: 2, name: 'Steve', payment: 'Unpaid', month: 'February', amount: 8000 },
    { id: 3, name: 'Scott', payment: 'Paid', month: 'April', amount: 10000 },
    { id: 4, name: 'Brian', payment: 'Unpaid', month: 'June', amount: 6000 },
    { id: 5, name: 'John', payment: 'Paid', month: 'October', amount: 15000 }
  ];

  const renderTable = (data, title, headers) => (
    <div className="w-[70%] bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md overflow-hidden pt-auto">
      <h3 className="font-bold text-lg px-5 py-4">{title}</h3>
      <table className="w-[100%] h-[auto]">
        <thead className="border-b-2 border-[#E65F2B]/20">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 pb-2 font-bold text-[#E65F2B]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors">
              <td className="py-3 px-6 max-w-max text-center">{item.name}</td>
              <td className="py-3 px-6 max-w-max text-center">{item.month}</td>
              <td className="py-3 px-6 max-w-max text-center">₹ {item.amount}</td>
              <td className="py-3 px-6 max-w-max text-center">
                <span
                  className={`text-sm px-3 py-[4px] rounded-full text-center bg-[#F6F1EE] font-medium ${item.payment?.toLowerCase() === "paid"
                    ? "border-[1px] border-[#89E093] text-[#2EAC34]"
                    : item.payment?.toLowerCase() ===
                      "unpaid"
                      ? "border-[1px] border-[#E08989] text-[#AC2E2E]"
                      : "border-[1px] border-[#A6A6A6] text-[#737373]"
                    }`}
                >
                  {item.payment}
                </span>
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
      <div className="mt-[30px] flex flex-col gap-4 items-start">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="w-[230px] h-20 border border-[#E65F2B] bg-[#F2EAE5] p-5 text-left rounded-xl flex flex-col justify-center"
          >
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 mb-1">{item.label}</span>
              <span className="text-2xl font-bold text-black">
                ₹ {item.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#EBDFD7]">
      <div className="w-[90%] mx-auto py-5 gap-5 flex flex-col">
        <section className="flex justify-between p-4">
          {renderTable(clientData, 'Clients', ['Client', 'Month', 'Amount', 'Payment'])}
          {renderSummaryCard()}
        </section>

        <section className="flex justify-between p-4">
          {renderTable(interviewerData, 'Interviewers', ['Interviewer', 'Month', 'Amount', 'Payment'])}
          {renderSummaryCard()}
        </section>
      </div>
    </div>
  );
};

export { Finance as InternalFinance };