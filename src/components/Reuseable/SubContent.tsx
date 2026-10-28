import React from "react";

type SubContentProps = {
  title: string;
  content: string;
};

const SubContent: React.FC<SubContentProps> = ({ title, content }) => {
  return (
    <div className="">
      <h4 className="text-lg md:text-xl lg:text-2xl font-medium text-heading-blue leading-snug">
        {title}
      </h4>
      <p className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-4 leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default SubContent;
