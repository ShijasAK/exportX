import React from "react";
import SocialMediaHistoryCard from "./SocialMediaHistoryCard";

const All = () => {
  const taskListCard = [
    {
      title: "New Nike is on the floor. Launch campaign.",
      description:
        "An Era Starts with new nike. Lace up and prepare to conquer the miles ahead...Read More",
    },
    {
      title: "New Nike is on the floor. Launch campaign.",
      description:
        "An Era Starts with new nike. Lace up and prepare to conquer the miles ahead...Read More",
    },
    {
      title: "New Nike is on the floor. Launch campaign.",
      description:
        "An Era Starts with new nike. Lace up and prepare to conquer the miles ahead...Read More",
    },
  ];
  return (
    <div>
      {taskListCard.map((item, index) => (
        <SocialMediaHistoryCard
          key={index}
          title={item?.title}
          description={item?.description}
        />
      ))}
    </div>
  );
};

export default All;
