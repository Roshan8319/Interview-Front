import React from 'react';

const Finance = () => {
  // Dummy data for clients and interviewers
  const clientData = [
    { id: 1, name: 'PhonePay', payment: 'Paid', month: 'January', amount: 125000 },
    { id: 2, name: 'WayFair', payment: 'Unpaid', month: 'May', amount: 85000 },
    { id: 3, name: 'Quince', payment: 'Paid', month: 'July', amount: 67000 },
    { id: 4, name: 'Flipkart', payment: 'Unpaid', month: 'September', amount: 156000 },
    { id: 5, name: 'Shopsy', payment: 'Paid', month: 'December', amount: 90000 }
  ];

  const interviewerData = [
    { id: 1, name: 'Rajesh Kumar', payment: 'Paid', month: 'December', amount: 24000 },
    { id: 2, name: 'Steve Harper', payment: 'Unpaid', month: 'February', amount: 18000 },
    { id: 3, name: 'Scott Johnson', payment: 'Paid', month: 'April', amount: 22000 },
    { id: 4, name: 'Brian Wilson', payment: 'Unpaid', month: 'June', amount: 16000 },
    { id: 5, name: 'John Miller', payment: 'Paid', month: 'October', amount: 25000 }
  ];

  const renderTable = (data, title, headers) => (
    <div className="w-full lg:w-[70%] bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md overflow-hidden pt-auto">
      <h3 className="font-bold text-lg px-5 py-4">{title}</h3>
      <div className="hidden sm:block"> {/* Table for tablet and desktop */}
        <table className="w-full h-[auto]">
          <thead className="border-b-2 border-[#E65F2B]/20">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 pb-2 font-bold text-[#E65F2B] text-center first:text-start"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors">
                <td className="py-3 px-6 max-w-max text-start">{item.name}</td>
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

      {/* Card layout for mobile */}
      <div className="sm:hidden px-4 pb-4">
        {data.map((item) => (
          <div key={item.id} className="mb-4 bg-[#F6F1EE]/50 p-3 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{item.name}</span>
              <span
                className={`text-xs px-2 py-[3px] rounded-full text-center bg-[#F6F1EE] font-medium ${item.payment?.toLowerCase() === "paid"
                  ? "border-[1px] border-[#89E093] text-[#2EAC34]"
                  : item.payment?.toLowerCase() ===
                    "unpaid"
                    ? "border-[1px] border-[#E08989] text-[#AC2E2E]"
                    : "border-[1px] border-[#A6A6A6] text-[#737373]"
                  }`}
              >
                {item.payment}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{headers[1]}: {item.month}</span>
              <span className="font-semibold">₹ {item.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSummaryCard = (data) => {
    // Calculate totals based on the provided data
    const paidAmount = data.filter(item => item.payment === 'Paid')
      .reduce((sum, item) => sum + item.amount, 0);

    const unpaidAmount = data.filter(item => item.payment === 'Unpaid')
      .reduce((sum, item) => sum + item.amount, 0);

    const totalAmount = paidAmount + unpaidAmount;

    const summaryItems = [
      { label: 'Paid', amount: paidAmount },
      { label: 'Unpaid', amount: unpaidAmount },
      { label: 'Total', amount: totalAmount }
    ];

    return (
      <div className="mt-6 sm:mt-0 w-full lg:w-auto">
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-3 sm:gap-4">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="border border-[#E65F2B] bg-[#F2EAE5] p-3 sm:p-5 text-left rounded-xl flex flex-col justify-center sm:w-[230px] h-16 sm:h-20"
            >
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-gray-600 mb-0 sm:mb-1">{item.label}</span>
                <span className="text-sm sm:text-2xl font-bold text-black whitespace-nowrap">
                  ₹ {item.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#EBDFD7] min-h-[calc(100vh-64px)]">
      <div className="w-[95%] sm:w-[90%] mx-auto py-4 gap-6 flex flex-col">
        <section className="flex flex-col lg:flex-row justify-between">
          {renderTable(clientData, 'Clients', ['Client', 'Month', 'Amount', 'Payment'])}
          {renderSummaryCard(clientData)}
        </section>

        <section className="flex flex-col lg:flex-row justify-between">
          {renderTable(interviewerData, 'Interviewers', ['Interviewer', 'Month', 'Amount', 'Payment'])}
          {renderSummaryCard(interviewerData)}
        </section>
      </div>
    </div>
  );
};

export { Finance as InternalFinance };