type SectionTitleProps = {
  title: string;
  subTitle?: string;
};

export const MiniTitle = ({ title, subTitle }: SectionTitleProps) => {
  return (
    <div>
      <h1 className="text-white font-sans font-semibold text-[24px] ">
        {title}
      </h1>

      {subTitle && (
        <p className="text-[#6B7280] font-sans font-normal text-base leading-[25.6px] max-w-[618px] mt-2">
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default MiniTitle;
