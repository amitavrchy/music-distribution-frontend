type SectionTitleProps = {
  title: string;
};

export const Title = ({ title }: SectionTitleProps) => {
  return (
    <div>
      <h1 className="text-[#252B37] font-plus-jakarta text-[32px] font-bold leading-[36px]">
        {title}
      </h1>
    </div>
  );
};

export default Title;
