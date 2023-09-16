import Image from "next/image";

const DashboardPersionUi = ({ iconPath, title, count }) => {
  return (
    <div className="flex flex-row items-center dashboardPersionUi-main gap-2">
      <div>
        <Image src={iconPath} width={100} />
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <span className="dashboardPersionUi-title">{title}</span>
        <div className="dashboardPersionUi-count-shape">
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPersionUi;
