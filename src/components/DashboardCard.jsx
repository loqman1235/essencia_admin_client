const DashboardCard = ({ title, count, icon, bgColor }) => {
  return (
    <div className="w-full bg-white flex items-center justify-between shadow-gray-100 shadow-lg overflow-hidden">
      {/* Icon */}
      <div
        className={`w-[100px]  h-full flex items-center justify-center text-white ${bgColor}`}
      >
        {icon}
      </div>
      <div className="p-5 ">
        <p className=" text-gray-400">{title}</p>
        <h2 className="text-2xl font-bold tracking-tight text-right text-zinc-600">
          {count}
        </h2>
      </div>
    </div>
  );
};

export default DashboardCard;
