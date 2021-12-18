import React from "react";
import Button from "@mui/material/Button";
import "./index.css";

const Tag = ({ eachData }) => {
  console.log("EACH DATA===>", eachData);

  let tags = [];
  tags.push(eachData.tags);
  console.log("TAGS==>", tags);

  return (
    <div className="tag">
      {tags.forEach((tag) => {
        return (
          <Button
            style={{ color: "white", textAlign: "center" }}
            variant="outlined"
          >
            {tag.tags_name}
            {console.log("ITEM==>", tag.tags_name)}
          </Button>
        );
      })}
    </div>
  );
};

export default Tag;
