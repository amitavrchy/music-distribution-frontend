type CommonHeadingProps = {
  title: string;
  description?: string; // make description optional
};

const CommonHeading = ({ title, description }: CommonHeadingProps) => {
  return (
    <div>
      <h1
        className={`text-[24px] md:text-[32px] font-bold w-full text-heading-blue ${
          description ? "mb-4" : "mb-0"
        }`}
      >
        {title}
      </h1>
      {description && (
        <p className="text-paragraph-gray text-4 md:text-[18px] mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default CommonHeading;
