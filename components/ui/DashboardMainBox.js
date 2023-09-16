"use client";

const DashboardMainBox = ({title,price,icon}) => {
  return (
    <div className="flex flex-row justify-center items-center mainDashBoxDiv">
      <div className="mainDashBoxIcon">
       {icon}
      </div>
      <div className="flex flex-col justify-center priceAndTitle">
        <span className="priceAndTitle-title">{title}</span>
        <span className="priceAndTitle-price">{price}</span>
      </div>
    </div>
  );
};

export default DashboardMainBox;
