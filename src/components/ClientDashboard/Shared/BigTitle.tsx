type SectionTitleProps = {
  title: string;
  subTitle?: string;
};

export const BigTitle = ({ title, subTitle }: SectionTitleProps) => {
  return (
    <div className="text-center flex flex-col items-center justify-center px-4">
      <h1 className="text-[#194185] font-plus-jakarta text-[32px] font-bold leading-[36px]">
        {title}
      </h1>
      {subTitle && (
        <p className="text-[#717680] font-dm-sans text-[18px] font-normal leading-[160%] max-w-[618px] mt-2">
          {subTitle}
        </p>
      )}
    </div>
  );
};
