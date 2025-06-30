import React from "react";
import { FaUndo, FaMoneyBillAlt, FaTags } from "react-icons/fa";

const features = [
  {
    icon: <FaUndo />,
    text: "7 Days Easy Return",
  },
  {
    icon: <FaMoneyBillAlt />,
    text: "Cash on Delivery",
  },
  {
    icon: <FaTags />,
    text: "Lowest Prices",
  },
];

const FeatureHighlights = () => {
  return (
    <div className="hidden lg:block bg-[#FCEDFA] border-y border-purple-400 py-2 px-4 md:px-8 text-center">
      {/* Outer container */}
      <div className="bg-white rounded-lg border border-purple-200 p-1">
        {/* Inner container */}
        <div className="max-w-xl flex flex-row justify-center items-center gap-3 text-sm font-medium text-gray-700 mx-auto">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 whitespace-nowrap border-b sm:border-b-0 sm:border-r border-gray-300 last:border-none px-4 py-2"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;
