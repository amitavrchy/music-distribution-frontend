import { AiFillDollarCircle } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { FaBorderAll, FaArrowUp } from "react-icons/fa";
import { MdOutlineOutbox } from "react-icons/md";

const ProfitLossCard = () => {
  const statusData = [
    {
      title: "Total Earnings",
      amount: "$892,453.86",
      change: "↓ 12%",
      unit: "for this month",
      icon: <AiFillDollarCircle />,
    },
    {
      title: "Total Payments",
      amount: "$654,128.45",
      change: "↓ 12%",
      unit: "for this month",
      icon: <FaBorderAll />,
    },
    {
      title: "Active Submissions",
      amount: "42",
      change: "↓ 12%",
      unit: "for this month",
      icon: <MdOutlineOutbox />,
    },
    {
      title: "Total Revenue",
      amount: "$856k",
      change: "↓ -8%",
      unit: "for this month",
      icon: <BiMessageDetail />,
    },
  ];

  const colors = ["#FFA600", "#9747FF", "#12CC1E", "#009CDE"];
  const bgColors = ["#FFA6001A", "#9747FF1A", "#12CC1E1A", "#009CDE1A"]; // 10% opacity in hex

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 place-items-start w-full ">
      {statusData.map((single, index) => {
        const isNegative = single.change.includes("-");
        const changeColor = isNegative ? "#E35A5F" : "#12CC1E";
        const cleanChangeText = single.change.replace(/[↓↑]/g, "").trim();

        return (
          <div
            key={single.title}
            className="w-full h-[187px]  p-5 sm:p-6 bg-[#0C211F] rounded-[16px]  flex flex-col justify-between mx-auto"
          >
            {/* Top Row */}
            <div className="flex items-center justify-start gap-5">
              <div
                className="w-[48px] h-[48px] rounded-[12px] p-[12px] flex items-center justify-center"
                style={{ backgroundColor: bgColors[index] }}
              >
                <span
                  className="w-6 h-6 text-[24px] flex items-center justify-center"
                  style={{ color: colors[index] }}
                >
                  {single.icon}
                </span>
              </div>

              <h1 className="text-[#BDBDBD] text-[18px] leading-[160%] font-sans">
                {single.title}
              </h1>
            </div>

            {/* Centered Amount */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold font-Robot tracking-[-0.68px]">
                {single.amount}
              </h2>
            </div>

            {/* Bottom Row: Change & Unit */}
            <div className="flex items-center justify-start gap-1 text-sm font-Robot">
              <FaArrowUp
                style={{
                  color: changeColor,
                  transform: isNegative ? "rotate(180deg)" : "none",
                }}
              />
              <span style={{ color: changeColor }}>{cleanChangeText}</span>
              <span className="text-[#11981F]">{single.unit}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfitLossCard;
